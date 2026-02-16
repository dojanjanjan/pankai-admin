import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json

def send_test_mail():
    host = "smtp.ionos.de"
    port = 587
    user = "yunai@young-creatives.de"
    password = "Z2M7JcqY7Q4MsrV"
    to_email = "jung@young-creatives.de"

    msg = MIMEMultipart()
    msg['From'] = f"YunAI <{user}>"
    msg['To'] = to_email
    msg['Subject'] = "Test: Verbindung YunAI -> Dojan"

    body = "Hallo Dojan,\n\ndies ist eine Test-Mail von mir über mein neues IONOS-Postfach.\nWenn du das liest, funktioniert der Versand einwandfrei.\n\nBeste Grüße,\nYunAI 🌟"
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP(host, port)
        server.starttls()
        server.login(user, password)
        server.send_message(msg)
        server.quit()
        return {"status": "success", "message": f"Mail erfolgreich an {to_email} gesendet."}
    except Exception as e:
        return {"status": "error", "message": str(e)}

if __name__ == "__main__":
    print(json.dumps(send_test_mail()))
