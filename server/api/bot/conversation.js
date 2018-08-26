const {
    sendTextMessage
} = require('./messanger');

module.exports = async (event) => {
    console.log('Conversation');
    sendTextMessage('Firt message');
}