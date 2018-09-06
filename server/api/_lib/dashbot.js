// const {
// 	dashbot
// } = require('dashbot')(process.env.DASHBOT_API_KEY).facebook;
// const request = require('request');

const pausedUsers = {};

const pause = (req, res) => {
	const {
		paused,
		userId
	} = req.body;
	pausedUsers[userId] = paused;
	console.log(`Pause functions ${userId}`, paused);
	console.log(typeof pausedUsers[userId], pausedUsers[userId]);
	res.send('ok');
};


module.exports = {
	pause,
	pausedUsers
};