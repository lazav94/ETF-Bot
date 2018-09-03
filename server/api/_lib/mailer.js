var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'lazav94@gmail.com',
           pass: '89783397.5'
       }
   });



 const sendMail = (email, subject, html) => {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: 'lazav94@gmail.com', // sender address
            to: 'lazar@spartans.tech', // list of receivers
            subject: 'Subject of your email', // Subject line
            html: '<p>Your html here</p>'// plain text body
          };

          transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log(err)
                reject(err);
            } else {
                console.log(info);
                resolve(info);
            }
         });
    });
 }

module.exports = sendMail;

