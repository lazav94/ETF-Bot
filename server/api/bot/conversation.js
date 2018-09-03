const {
    sendTextMessage
} = require('./messanger');

module.exports = async (event) => {
    console.log('Conversation');
    const sender = event.sender.id;
    await sendTextMessage(sender, 'First message to bot! Hello I\'m ETF bot');
}


// Payload haneler

exports = sendVerificationEmail = (sender, email) => {
    // 1. Get email
    // 2. Generate UUID
    // 3. Get sender id and user
    // 4. save token to the user
};

const getStarted = async () => {

};


const broadcast = async () => {
  // 1. Get all sender id
  // 2. Goes through all users
  // 3. Send the message to all users
};