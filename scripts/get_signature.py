import imaplib
import email
import json
import os

def fetch_signature_mail():
    host = "imap.ionos.de"
    user = "yunai@young-creatives.de"
    password = "Z2M7JcqY7Q4MsrV"

    try:
        mail = imaplib.IMAP4_SSL(host)
        mail.login(user, password)
        mail.select("inbox")
        
        status, messages = mail.search(None, 'ALL')
        if status != 'OK':
            return {"status": "error", "message": "Could not search inbox"}
        
        ids = messages[0].split()
        
        for msg_id in reversed(ids):
            res, msg_data = mail.fetch(msg_id, '(RFC822)')
            for response_part in msg_data:
                if isinstance(response_part, tuple):
                    msg = email.message_from_bytes(response_part[1])
                    subject = email.header.decode_header(msg["Subject"])[0][0]
                    if isinstance(subject, bytes):
                        subject = subject.decode()
                    
                    if "Signatur2" in subject:
                        html_body = ""
                        text_body = ""
                        if msg.is_multipart():
                            for part in msg.walk():
                                content_type = part.get_content_type()
                                disposition = str(part.get("Content-Disposition"))
                                if content_type == "text/plain" and "attachment" not in disposition:
                                    try:
                                        text_body = part.get_payload(decode=True).decode('utf-8')
                                    except:
                                        text_body = part.get_payload(decode=True).decode('iso-8859-1')
                                elif content_type == "text/html" and "attachment" not in disposition:
                                    try:
                                        html_body = part.get_payload(decode=True).decode('utf-8')
                                    except:
                                        html_body = part.get_payload(decode=True).decode('iso-8859-1')
                        else:
                            try:
                                text_body = msg.get_payload(decode=True).decode('utf-8')
                            except:
                                text_body = msg.get_payload(decode=True).decode('iso-8859-1')
                        
                        mail.logout()
                        return {"status": "success", "subject": subject, "html": html_body, "text": text_body}
        
        mail.logout()
        return {"status": "error", "message": "Signature mail not found"}
        
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    result = fetch_signature_mail()
    print(json.dumps(result))
