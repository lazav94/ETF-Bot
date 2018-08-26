const request = require('request');

// Facebook page access token
// TODO get never expired access token
const access_token = process.env.ACCESS_TOKEN;
const url = 'https://graph.facebook.com/v3.1/me/messages';


const getUserInfo = id => {
	const url = `https://graph.facebook.com/${id}?fields=first_name,last_name,profile_pic&access_token=${access_token}`;
	return new Promise((resolve, reject) => {
		request(url, (err, res, body) => {
			const user = JSON.parse(body);
			if (!err && res.statusCode === 200) {
				const user = JSON.parse(body);
				resolve(user);
			} else {
                reject('User info not found!');
            }
		});
	});
};

const sendRequest = (messageData, sender, messageType) => {
	let json = {
		recipient: {
			id: sender,
		},
		message: messageData,
	};
	if (messageType === 'typing') {
	  json.message = undefined;
	  json.sender_action = messageData;
	}

	return new Promise((resolve, reject) => {
		const requestData = {
			url,
			qs: {
				access_token,
			},
			method: 'POST',
			json
		};
		request(requestData, (error, response) => {
			if (error) {
				console.error('Error sending messages: ', error);
				reject(error);
			} else if (response.body.error) {
				console.error('Error: ', response.body.error);
				reject(response.body.error);
			} else {
				// if (process.env.ENV === 'production') {
				// 	dashbot.logOutgoing(requestData, response.body);
				// }
				resolve();
			}
		});
	});
};



exports = sendTextMessage = async (sender, text) => {
	await sendRequest({
		text: text,
	}, sender, access_token);
};

