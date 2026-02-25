import imaplib
import email
from email.header import decode_header
import json
import os

def check_invoices():
    with open('memory/email-config.json', 'r') as f:
        config = json.load(f)
    
    try:
        mail = imaplib.IMAP4_SSL(config['imap']['host'], config['imap']['port'])
        mail.login(config['email'], config['password'])
        mail.select("inbox")
        
        # Search for unread emails
        status, messages = mail.search(None, 'UNSEEN')
        if status != 'OK':
            return []

        found_invoices = []
        for num in messages[0].split():
            status, data = mail.fetch(num, '(RFC822)')
            if status != 'OK':
                continue
            
            msg = email.message_from_bytes(data[0][1])
            subject, encoding = decode_header(msg["Subject"])[0]
            if isinstance(subject, bytes):
                subject = subject.decode(encoding if encoding else "utf-8")
            
            # Keywords for invoices
            keywords = ["rechnung", "invoice", "beleg"]
            if any(kw in subject.lower() for kw in keywords):
                found_invoices.append({
                    "id": num.decode(),
                    "subject": subject,
                    "from": msg.get("From")
                })
        
        mail.logout()
        return found_invoices
    except Exception as e:
        print(f"Error: {e}")
        return []

if __name__ == "__main__":
    invoices = check_invoices()
    print(json.dumps(invoices))
