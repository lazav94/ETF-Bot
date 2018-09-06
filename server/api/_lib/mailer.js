var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
           user: process.env.EMAIL,
           pass: process.env.EMAIL_PASS
       }
   });

// https://myaccount.google.com/lesssecureapps?pli=1

// let transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: account.user, // generated ethereal user
//         pass: account.pass // generated ethereal password
//     }
// });


 const sendMail = (to, subject, html) => {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: process.env.EMAIL, // sender address
            to, // list of receivers
            subject, // Subject line
            html// plain text body
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

