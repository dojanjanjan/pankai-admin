import imaplib
import email
from email.header import decode_header
import os
import json

# Configuration
with open('memory/email-config.json', 'r') as f:
    config = json.load(f)

IMAP_SERVER = config['imap']['host']
EMAIL_USER = config['email']
EMAIL_PASS = config['password']
SAVE_PATH = 'finance/invoices/2026/'

def check_for_invoices():
    try:
        mail = imaplib.IMAP4_SSL(IMAP_SERVER)
        mail.login(EMAIL_USER, EMAIL_PASS)
        mail.select("inbox")

        # Search for common invoice keywords in subject or typical senders
        # This is a broad search for testing
        status, messages = mail.search(None, '(OR SUBJECT "Rechnung" (OR SUBJECT "Invoice" SUBJECT "Beleg"))')
        
        if status != 'OK':
            print("No invoices found or search failed.")
            return

        message_ids = messages[0].split()
        print(f"Found {len(message_ids)} potential invoice emails.")

        for msg_id in message_ids:
            status, data = mail.fetch(msg_id, '(RFC822)')
            if status != 'OK': continue
            
            raw_email = data[0][1]
            msg = email.message_from_bytes(raw_email)
            
            subject, encoding = decode_header(msg.get("Subject"))[0]
            if isinstance(subject, bytes):
                subject = subject.decode(encoding if encoding else "utf-8")
            
            print(f"Checking: {subject}")

            for part in msg.walk():
                if part.get_content_maintype() == 'multipart': continue
                if part.get('Content-Disposition') is None: continue
                
                filename = part.get_filename()
                if filename:
                    # Basic filter for PDFs or Images
                    if filename.lower().endswith(('.pdf', '.png', '.jpg', '.jpeg')):
                        filepath = os.path.join(SAVE_PATH, filename)
                        if not os.path.isfile(filepath):
                            with open(filepath, 'wb') as f:
                                f.write(part.get_payload(decode=True))
                            print(f"Saved: {filename}")
        
        mail.logout()
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    check_for_invoices()
