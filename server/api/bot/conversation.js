const {
    sendTextMessage
} = require('./messanger');

module.exports = async (event) => {
    console.log('Conversation');
    const sender = event.sender.id;
    await sendTextMessage(sender, 'First message to bot! Hello I\'m ETF bot');
}