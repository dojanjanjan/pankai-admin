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
        // Suche nach allen neuen Mails (vielleicht steht GitHub nicht im Betreff)
        var searchCriteria = ['UNSEEN'];
        var fetchOptions = {
            bodies: ['HEADER', 'TEXT', ''],
            markSeen: false
        };
        return connection.search(searchCriteria, fetchOptions).then(function (results) {
            if (results.length === 0) {
                console.log("Keine ungelesenen Mails gefunden.");
                connection.end();
                return;
            }

            // Letzte 3 Mails prüfen
            const recent = results.slice(-3);
            const promises = recent.map(res => {
                const all = res.parts.find(p => p.which === '');
                return simpleParser(all.body).then(mail => ({
                    subject: mail.subject,
                    text: mail.text
                }));
            });

            return Promise.all(promises).then(mails => {
                mails.forEach((m, i) => {
                    console.log(`--- MAIL ${i+1} ---`);
                    console.log("Betreff:", m.subject);
                    console.log("Text-Snippet:", m.text ? m.text.substring(0, 300) : "kein Text");
                });
                connection.end();
            });
        });
    });
}).catch(function (err) {
    console.error("Fehler:", err);
});
