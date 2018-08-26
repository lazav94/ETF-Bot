const { conversation } = require('../conversation');


const verifyToken = (req, res) => {
	try {
		if (req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
			res.send(req.query['hub.challenge']);
		}
		res.send('Error, wrong token');
	} catch (error) {
		console.error('Webhook error', error);
	}
};

const startConversation = async (req, res) => {
	try {
		if (req.body.entry) {
			let data;
			const entry = req.body.entry[0];

			const {
				// id,
				standby,
				messaging
			} = entry;
			if (standby) {
				data = standby[0];
			} else if (messaging) {
				data = messaging;
			}
			try {
				for (let i = 0; i < data.length; i += 1) {
					const event = data[i];
					if (event) {
						// if(process.env.ENV === 'production'){
						// 	dashbot.logIncoming(req.body);
						// }
						// if (!pausedUsers[event.sender.id]) {
							await conversation(event);
						// }
					}
				}
				res.sendStatus(200);
			} catch (e) {
				console.log('Messenger error', e);
				res.sendStatus(404);
			}
		} else {
			console.log('Check this error!');
			res.sendStatus(500);
		}

	} catch (error) {
		console.error('Webhook [POST] error', error);
		res.send(500);
	}
};

module.exports = {
    verifyToken,
    startConversation
}