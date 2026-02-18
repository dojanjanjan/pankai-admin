import imaplib
import email
import json
import os

def check_yunai_mail():
    host = "imap.ionos.de"
    user = "yunai@young-creatives.de"
    password = "Z2M7JcqY7Q4MsrV"

    try:
        mail = imaplib.IMAP4_SSL(host)
        mail.login(user, password)
        mail.select("inbox")
        
        # Search for unread messages
        status, messages = mail.search(None, 'UNSEEN')
        if status != 'OK':
            return {"status": "error", "message": "Could not search inbox"}
        
        unread_ids = messages[0].split()
        results = []
        
        for msg_id in unread_ids[-5:]: # Get last 5 unread
            res, msg_data = mail.fetch(msg_id, '(RFC822)')
            for response_part in msg_data:
                if isinstance(response_part, tuple):
                    msg = email.message_from_bytes(response_part[1])
                    subject = email.header.decode_header(msg["Subject"])[0][0]
                    if isinstance(subject, bytes):
                        try:
                            subject = subject.decode('utf-8')
                        except:
                            subject = subject.decode('iso-8859-1')
                    from_ = msg.get("From")
                    results.append({"from": from_, "subject": subject})
        
        mail.logout()
        return {"status": "success", "unread_count": len(unread_ids), "latest": results}
        
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    print(json.dumps(check_yunai_mail()))
