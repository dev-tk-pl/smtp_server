// const express = require("express");
// const cors = require('cors');
// require('dotenv').config();

// const SibApiV3Sdk = require('sib-api-v3-sdk');
// const app = express();
// const port = process.env.PORT || 3000;
// // const allowedOrigins = ['http://89.64.122.159'];

// app.use(function (req, res, next) {
//     // const origin = req.headers.origin;
//     // if (allowedOrigins.includes(origin)) {
//     // 	res.setHeader('Access-Control-Allow-Origin', origin);
//     // }
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

// app.use(cors());
// app.use(express.json());
// const defaultClient = SibApiV3Sdk.ApiClient.instance;
// apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

// app.post('/send-email', (req, res) => {
//     // const token = req.headers['authorization'];
//     // if (token === process.env.SECRET_KEY) {
//     // console.log(req.headers)
//     const dane = req.body;
//     // console.log(dane);
//     sendEmail(dane)
//         .then(() => {
//             res.status(200).json({ message: 'Wiadomość wysłana' });
//         })
//         .catch((error) => {
//             console.error(error);
//             res.status(500).json({ error: 'Wystąpił błąd podczas wysyłania wiadomości.' });
//         });
//     //     } else {
//     //         res.status(401).json({ error: 'Błąd autoryzacji' });
//     //     }
// });

// function sendEmail(dane) {
//     return new Promise((resolve, reject) => {
//         const { to, subject, text } = dane;
//         let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
//         let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

//         sendSmtpEmail.subject = "{{params.subject}}";
//         sendSmtpEmail.htmlContent = text;
//         sendSmtpEmail.sender = { "name": process.env.SENDER_NAME, "email": process.env.SENDER_EMAIL };
//         sendSmtpEmail.to = [{ "email": to, "name": process.env.RECEIVER_NAME }];
//         sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234", "Authorization": process.env.SECRET_KEY };
//         sendSmtpEmail.params = { "parameter": "My param value", "subject": subject };

//         apiInstance.sendTransacEmail(sendSmtpEmail)
//             .then(function (data) {
//                 console.log('API called successfully. Returned data: ' + JSON.stringify(data));
//                 resolve();
//             })
//             .catch(function (error) {
//                 console.error(error);
//                 reject(error);
//             });
//     });
// }

// app.listen(port, () => {
//     console.log(`Serwer SMTP nasłuchuje na porcie ${port}`);
// });


const express = require("express");
const cors = require('cors');

const SibApiV3Sdk = require('sib-api-v3-sdk');
const app = express();
let port = process.env.PORT || 3000;

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(cors());
app.use(express.json());
const defaultClient = SibApiV3Sdk.ApiClient.instance;
apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API_KEY;

app.post('/send-email', (req, res) => {
    const dane = req.body; // Otrzymane dane znajdują się w req.body

    // Wykonaj jakąś logikę na odebranych danych...
    console.log(dane);
    // Odpowiedz z potwierdzeniem
    sendEmail(dane, res);
});

function sendEmail(dane, res) {
    const { to, subject, text } = dane;

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = "My {{params.subject}}";
    sendSmtpEmail.htmlContent = text;
    sendSmtpEmail.sender = { "name": "DevTK", "email": "devtk@example.com" };
    sendSmtpEmail.to = [{ "email": to, "name": "Jane Doe" }];
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    sendSmtpEmail.params = { "parameter": "My param value", "subject": subject };

    apiInstance.sendTransacEmail(sendSmtpEmail)
        .then(function (data) {
            console.log('API called successfully. Returned data: ' + JSON.stringify(data));
            res.send("Wiadomość wysłana");
        })
        .catch(function (error) {
            console.error(error);
            res.status(500).json({ error: 'Wystąpił błąd podczas wysyłania wiadomości.' });
        });
}

app.listen(port, () => {
    console.log(`Serwer SMTP nasłuchuje na porcie ${port}`);
});
