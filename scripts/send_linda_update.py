import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json

def send_linda_update():
    host = "smtp.ionos.de"
    port = 587
    user = "yunai@young-creatives.de"
    password = "Z2M7JcqY7Q4MsrV"
    to_email = "tung@grandebeach-cafe.de"
    bcc_email = "jung@young-creatives.de"

    msg = MIMEMultipart('alternative')
    msg['From'] = f"YunAI <{user}>"
    msg['To'] = to_email
    msg['Bcc'] = bcc_email
    msg['Subject'] = "Update: Linda (Chatbot) ist wieder einsatzbereit"

    # Signature HTML
    signature_html = """
<div id="x_Signature">
<table style="direction: ltr; line-height: 1.4; color: rgb(51, 51, 51);" border="0" cellpadding="0" cellspacing="0">
<tbody>
<tr>
<td style="direction: ltr; line-height: 1.4; border-right: 2px solid rgb(51, 51, 51); padding-right: 20px; vertical-align: top;">
<div style="direction: ltr; line-height: 1.2; margin-bottom: 8px; font-family: Calibri, Helvetica, sans-serif; font-size: 18px; color: black;">
<span style="letter-spacing: 0.5px;">YOUNG </span><span style="letter-spacing: 0.5px; font-weight: 900;">CREATIVES</span></div>
<div style="direction: ltr; line-height: 1.4; max-width: 180px; font-family: Calibri, Helvetica, sans-serif; font-size: 11px; color: rgb(102, 102, 102);">
We craft bold brands and unforgettable digital experiences.</div>
</td>
<td style="direction: ltr; line-height: 1.4; padding-left: 20px; vertical-align: top;">
<div style="direction: ltr; line-height: 1.4; margin-bottom: 8px; font-family: Calibri, Helvetica, sans-serif; font-size: 16px; color: black;">
<b>YC AI Assistant</b></div>
<table style="direction: ltr; line-height: 1.4;" border="0" cellpadding="0" cellspacing="0">
<tbody>
<tr>
<td style="direction: ltr; line-height: 1.4; padding-right: 5px; padding-bottom: 4px; color: rgb(102, 102, 102);">
<div style="direction: ltr; line-height: 1.4; font-family: Calibri, Helvetica, sans-serif; font-size: 12px;">
<b>M:</b></div>
</td>
<td style="direction: ltr; line-height: 1.4; padding-bottom: 4px;">
<div style="direction: ltr; line-height: 1.4; font-family: Calibri, Helvetica, sans-serif; font-size: 12px; color: rgb(51, 51, 51); text-decoration: none;">
+49 (0) 40 345999</div>
</td>
</tr>
<tr>
<td style="direction: ltr; line-height: 1.4; padding-right: 5px; padding-bottom: 4px; color: rgb(102, 102, 102);">
<div style="direction: ltr; line-height: 1.4; font-family: Calibri, Helvetica, sans-serif; font-size: 12px;">
<b>E:</b></div>
</td>
<td style="direction: ltr; line-height: 1.4; padding-bottom: 4px;">
<div style="direction: ltr; line-height: 1.4; font-family: Calibri, Helvetica, sans-serif; font-size: 12px; color: rgb(51, 51, 51);">
<a style="color: rgb(51, 51, 51); text-decoration: none;" href="mailto:yunai@young-creatives.de">yunai@young-creatives.de</a></div>
</td>
</tr>
<tr>
<td style="direction: ltr; line-height: 1.4; padding-right: 5px; padding-bottom: 8px; color: rgb(102, 102, 102);">
<div style="direction: ltr; line-height: 1.4; font-family: Calibri, Helvetica, sans-serif; font-size: 12px;">
<b>W:</b></div>
</td>
<td style="direction: ltr; line-height: 1.4; padding-bottom: 8px;">
<div style="direction: ltr; line-height: 1.4; font-family: Calibri, Helvetica, sans-serif; font-size: 12px; color: rgb(51, 51, 51);">
<a style="color: rgb(51, 51, 51); text-decoration: none;" href="http://www.young-creatives.de/">www.young-creatives.de</a></div>
</td>
</tr>
</tbody>
</table>
<div style="direction: ltr; line-height: 1.4; margin-top: 8px; font-family: Calibri, Helvetica, sans-serif; font-size: 11px; color: rgb(136, 136, 136);">
Böhmersweg 21<br>
20148 Hamburg<br>
Germany</div>
</td>
</tr>
</tbody>
</table>
</div>
"""

    text_content = "Hallo Tung,\n\nkurze Info für dich: Linda (unser Chatbot) funktioniert wieder einwandfrei und ist einsatzbereit.\n\nBeste Grüße,\nYunAI"
    html_content = f"<html><body><p>Hallo Tung,<br><br>kurze Info für dich: <b>Linda</b> (unser Chatbot) funktioniert wieder einwandfrei und ist einsatzbereit.<br><br>Beste Grüße,<br>YunAI</p><br>{signature_html}</body></html>"

    msg.attach(MIMEText(text_content, 'plain'))
    msg.attach(MIMEText(html_content, 'html'))

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
    print(json.dumps(send_linda_update()))
