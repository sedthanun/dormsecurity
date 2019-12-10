var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'patitkaewjinda4@gmail.com',
    pass: 'IndiaTango'
  }
});

var mailOptions = {
  from: 'patitkaewjinda4@gmail.com',
  to: '62070138@kmitl.ac.th',
  subject: 'Someone has been register to your room.',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});