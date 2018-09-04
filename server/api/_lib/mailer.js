var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'lazav94@gmail.com',
           pass: '89783397.5'
       }
   });



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

