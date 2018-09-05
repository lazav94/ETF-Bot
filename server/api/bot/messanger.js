const request = require('request');

// Facebook page access token
// TODO get never expired access token
const access_token = process.env.ACCESS_TOKEN;

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
        console.log("FATAL ERROR");
    }

    return new Promise((resolve, reject) => {
        const requestData = {
            url: `https://graph.facebook.com/v2.6/me/messages?access_token=${access_token}`,
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

const url = `https://graph.facebook.com/v3.1/me/messenger_profile?access_token=${access_token}`

const addGetStarted = () => {
    const json = {
        form: {
            get_started: {
                payload: "Get Started"
            }
        }
    }
    console.log('added get started');
    request.post(url, json);
}


const addGreetingMessage = () => {
    const json = {
        form: {
            setting_type: "greeting",
            greeting: {
                text: 'Pocetna poruka.'
            }
        }
    }
    request.post(url, json);
    console.log("Greeting message added");
}


const prestantMenu = () => {
    const json = {
        form: {
            "setting_type": "call_to_actions",
            "thread_state": "existing_thread",
            "call_to_actions": [{
                    "type": "postback",
                    "title": "Help",
                    "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_HELP"
                },
                {
                    "type": "postback",
                    "title": "Latest Posts",
                    "payload": "DEVELOPER_DEFINED_PAYLOAD_FOR_LATEST_POSTS"
                },
                {
                    "type": "web_url",
                    "title": "View Website",
                    "url": "http://yoursite.com/"
                }
            ]
        }
    };
    request.post(url, json);
}

const sendTextMessage = async (sender, text) => {
    await sendRequest({
        text,
    }, sender, access_token);
};

const sendQuickReply = async (sender, text, quickReplies, payloads) => {
    const messageData = {
		text,
		quick_replies: [],
	};
	for (let i = 0; i < quickReplies.length; i++) {
		messageData.quick_replies.push({
			content_type: 'text',
			title: quickReplies[i],
			payload: (payloads && payloads[i] ? payloads[i]: text)
		});
	}
	await sendRequest(messageData, sender);
};

const sendImage = async (sender, url) => {
    const messageData = {
		attachment: {
			type: 'image',
			payload: {
				url,
				is_reusable: true
			}
		}
	};
	await sendRequest(messageData, sender);
}

const sendMessage = async (sender, message) => {
    switch (message.type) {
        case 'text':
            await sendTextMessage(sender, message.text);
            break;
        case 'image':

            break;
        case 'quickreplies':

            break;
        case 'button':

            break;

        default:
            break;
    }
};

const typingOn = (sender) => {
	sendRequest('typing_on', sender, 'typing');
}
const typingOff = (sender) => {
	sendRequest('typing_off', sender, 'typing');
};

const typing = (sender, seconds) => {
	typingOn(sender);
	if (typeof seconds === 'string') {
		seconds = Number.parseInt(seconds);
	}
	return new Promise((resolve) => {
		setTimeout(() => {
			typingOff(sender);
			resolve();
		}, seconds * 1000);
	});
};

module.exports = {
    getUserInfo,
    typingOn,
    sendTextMessage,
    sendQuickReply,
    sendImage
}