const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const cors = require('cors')({origin: true});
admin.initializeApp();

var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'patitkaewjinda4@gmail.com',//Your Username 
        pass: 'IndiaTango'//Your Password
    }
});

exports.sendMail = functions.database.ref('/studentbook/{documentId}').onCreate((snapshot, context) => {
        // getting dest email by query string
        const dest = snapshot._data.email
        const come = snapshot._data.name
        const mailOptions = {
            from: 'Dormsecurity', // Something like: Jane Doe <janedoe@gmail.com>
            to: dest,
            subject: 'มีคนกำลังขอเข้าห้องคุณ', // email subject
            html: '<h1>'+come+'</h1>'+'<h4> กำลังขอเข้าห้องคุณ ถ้าไม่ใช่โปรดติดต่อเจ้าหน้าที่ <h4><Br><img src="https://img.pngio.com/image-attention-png-7-png-image-png-attention-300_300.png">'
            //html or text
        };
  
        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log('Sended' + info);
         });     
    });    