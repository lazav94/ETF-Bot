var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
           user: 'lazav94@gmail.com',
           pass: '89783397.5'
       }
   });

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
            from: 'lazav94@gmail.com', // sender address
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

