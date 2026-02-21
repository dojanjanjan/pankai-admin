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
        var searchCriteria = ['UNSEEN', ['HEADER', 'SUBJECT', 'GitHub']];
        var fetchOptions = {
            bodies: ['HEADER', 'TEXT', ''],
            markSeen: true
        };
        return connection.search(searchCriteria, fetchOptions).then(function (results) {
            if (results.length === 0) {
                console.log("Keine ungelesenen GitHub-Mails gefunden.");
                connection.end();
                return;
            }

            // Letzte Nachricht nehmen
            const lastEmail = results[results.length - 1];
            const all = lastEmail.parts.find(p => p.which === '');
            
            return simpleParser(all.body).then(mail => {
                console.log("--- NEUE MAIL ---");
                console.log("Betreff:", mail.subject);
                console.log("Inhalt (Text):", mail.text);
                connection.end();
            });
        });
    });
}).catch(function (err) {
    console.error("Fehler:", err);
});
