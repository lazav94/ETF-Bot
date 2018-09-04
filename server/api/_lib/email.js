

const createEmailHTML = (id, token) => {
  const verifyAddress = `${process.env.DOMAIN}/auth/verify/?id=${id}&token=${token}`;
  console.log(verifyAddress)
  return `<head>
          </head>
          <body>
            <h3> ETF Bot verifikacioni email </h3>
            <br>
            Hvala sto koristite ETF Bot.
            Molimo Vas da potvrdite da je Vasa email adresa tacna. Klikline na dugme ispod da pocnete.
            <br>
            <br>
            <a style="display: block;
                      width: 250px;
                      height: 25px;
                      background: #66ff33;
                      padding: 10px;
                      text-align: center;
                      border-radius: 10px;
                      color: white;
                      font-weight: bold;
                      text-decoration: none !important;
                      cursor: pointer;
                      "
                href="${verifyAddress}">Verifikuj email adresu!</a>
            <br>
            <br>
            <br>
            <footer style="color:#b3b3b3;margin-bottom: 5%">© 2018 Copyright: Lazar Vasic</footer>
          </body>`
}



  module.exports = {
    createEmailHTML
  }