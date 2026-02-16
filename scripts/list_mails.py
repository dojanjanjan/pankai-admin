import imaplib
import email
import json

def list_all_subjects():
    host = "imap.ionos.de"
    user = "yunai@young-creatives.de"
    password = "Z2M7JcqY7Q4MsrV"
    try:
        mail = imaplib.IMAP4_SSL(host)
        mail.login(user, password)
        mail.select("inbox")
        status, messages = mail.search(None, 'ALL')
        ids = messages[0].split()
        results = []
        for msg_id in ids[-10:]:
            res, msg_data = mail.fetch(msg_id, '(RFC822)')
            for response_part in msg_data:
                if isinstance(response_part, tuple):
                    msg = email.message_from_bytes(response_part[1])
                    subj = email.header.decode_header(msg["Subject"])[0][0]
                    if isinstance(subj, bytes): subj = subj.decode()
                    results.append(subj)
        mail.logout()
        return results
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    print(json.dumps(list_all_subjects()))
