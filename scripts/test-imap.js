const imaps = require('imap-simple');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('memory/email-config.json', 'utf8'));

const imapConfig = {
    imap: {
        user: config.email,
        password: config.password,
        host: config.imap.host,
        port: config.imap.port,
        tls: config.imap.secure,
        authTimeout: 3000
    }
};

imaps.connect(imapConfig).then(function (connection) {
    console.log("IMAP Connection Successful!");
    return connection.openBox('INBOX').then(function () {
        var searchCriteria = ['UNSEEN'];
        var fetchOptions = {
            bodies: ['HEADER', 'TEXT'],
            markSeen: false
        };
        return connection.search(searchCriteria, fetchOptions).then(function (results) {
            console.log("Unread emails found: " + results.length);
            // results.forEach(res => console.log(res.parts[0].body.subject));
            connection.end();
        });
    });
}).catch(function (err) {
    console.error("IMAP Connection Failed:", err);
});
