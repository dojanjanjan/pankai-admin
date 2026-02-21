import imaplib
import email
from email.header import decode_header
import json
import time
from datetime import datetime, timezone

def decode_mime_words(s):
    return u"".join(
        word.decode(encoding or "utf-8") if isinstance(word, bytes) else word
        for word, encoding in decode_header(s)
    )

def check_emails():
    try:
        with open("memory/email-config.json", "r") as f:
            config = json.load(f)
        
        mail = imaplib.IMAP4_SSL(config["imap"]["host"], config["imap"]["port"])
        mail.login(config["email"], config["password"])
        mail.select("inbox")
        
        # Search for unread emails
        status, messages = mail.search(None, 'UNSEEN')
        if status != "OK":
            print("Error searching for emails")
            return

        email_ids = messages[0].split()
        if not email_ids:
            print("NO_NEW_EMAILS")
            return

        results = []
        for e_id in email_ids:
            status, msg_data = mail.fetch(e_id, "(RFC822)")
            if status != "OK":
                continue
            
            for response_part in msg_data:
                if isinstance(response_part, tuple):
                    msg = email.message_from_bytes(response_part[1])
                    subject = decode_mime_words(msg["subject"])
                    sender = decode_mime_words(msg["from"])
                    
                    # Get body
                    body = ""
                    if msg.is_multipart():
                        for part in msg.walk():
                            content_type = part.get_content_type()
                            content_disposition = str(part.get("Content-Disposition"))
                            if content_type == "text/plain" and "attachment" not in content_disposition:
                                try:
                                    body = part.get_payload(decode=True).decode(part.get_content_charset() or "utf-8", errors="replace")
                                except:
                                    body = part.get_payload(decode=True).decode("latin-1", errors="replace")
                                break
                    else:
                        try:
                            body = msg.get_payload(decode=True).decode(msg.get_content_charset() or "utf-8", errors="replace")
                        except:
                            body = msg.get_payload(decode=True).decode("latin-1", errors="replace")
                    
                    # Clean body for summary
                    summary_body = " ".join(body.split())[:200]
                    results.append({
                        "from": sender,
                        "subject": subject,
                        "summary": summary_body
                    })
        
        mail.logout()
        print(json.dumps(results))

    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    check_emails()
