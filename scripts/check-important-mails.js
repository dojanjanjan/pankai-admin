const imaps = require('imap-simple');
const fs = require('fs');
const { simpleParser } = require('mailparser');

const config = JSON.parse(fs.readFileSync('memory/email-config.json', 'utf8'));

const imapConfig = {
    imap: {
        user: config.email,
        password: config.password,
        host: config.imap.host,
        port: config.imap.port,
        tls: config.imap.secure,
        authTimeout: 10000
    }
};

imaps.connect(imapConfig).then(function (connection) {
    return connection.openBox('INBOX').then(function () {
        var searchCriteria = ['UNSEEN'];
        var fetchOptions = {
            bodies: ['HEADER', 'TEXT', ''],
            markSeen: false
        };
        return connection.search(searchCriteria, fetchOptions).then(function (results) {
            if (results.length === 0) {
                console.log("Keine neuen Mails.");
                connection.end();
                return;
            }

            const promises = results.map(res => {
                const all = res.parts.find(p => p.which === '');
                return simpleParser(all.body).then(mail => ({
                    from: mail.from.text,
                    subject: mail.subject,
                    date: mail.date
                }));
            });

            return Promise.all(promises).then(mails => {
                console.log(JSON.stringify(mails, null, 2));
                connection.end();
            });
        });
    });
}).catch(function (err) {
    console.error("Fehler:", err);
});
