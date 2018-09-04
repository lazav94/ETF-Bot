const getStudentById = require('../student/student.controller').getStudentById;

const logger = require('winston');

const login = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    console.log(`Email: ${email} password: ${password}`);

    console.log(process.env.EMAIL);
    console.log(process.env.PASSWORD);
    if(email === process.env.EMAIL) {
        if(password === process.env.PASSWORD) {
            console.log('Render index');
            // TODO why this doesn't work
            res.render('index.pug', {title: 'Home'});
        } else {
            console.error('Password is not valid');
            res.sendStatus(307)
        }
    } else {
        console.error('Username is not valid');
        res.sendStatus(307)
    }
};

const verify = async (req, res) => {
    // 1. Get tocken from url
    const { id, token } = req.query;
    console.log(token);
    console.log(id);
    res.sendStatus(200);
    // 2. Get user by id
    // TODO make controller fucnton for this in user
    // const user = await User.findById(id);

    // 3. Compare token from URL with users token that we created before
    // if(token === user.token) {
    // 3.1 if it is continue with the flow
    // } else {
    // 3.2. suggest to user to resend the email with new token
    // }

};

const verifyStudent = async sender => {
    const student = await getStudentById(sender);
    if(student){
        return student.verified;
    } else {
        console.error('Fatal error, check verifyStudent function');
    }
};


module.exports = {
    login,
    verify,
    verifyStudent
}

