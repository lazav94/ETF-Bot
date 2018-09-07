const request = require('request');
const dashbot = require('dashbot')(process.env.DASHBOT_API_KEY).facebook;

const getStudentById = require('../student/student.controller').getStudentById;

// Facebook page access token
// TODO get never expired access token
const access_token = process.env.ACCESS_TOKEN;

const getUserInfo = id => {
  const url = `https://graph.facebook.com/${id}?fields=first_name,last_name,profile_pic&access_token=${access_token}`;
  return new Promise((resolve, reject) => {
    request(url, (err, res, body) => {
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
    console.log('FATAL ERROR');
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
        dashbot.logOutgoing(requestData, response.body);
        resolve();
      }
    });
  });
};

const url = `https://graph.facebook.com/v3.1/me/messenger_profile?access_token=${access_token}`;

const addGetStarted = () => {
  const json = {
    form: {
      get_started: {
        payload: 'Get Started'
      }
    }
  };
  console.log('added get started');
  request.post(url, json);
};


const addGreetingMessage = () => {
  const json = {
    form: {
      setting_type: 'greeting',
      greeting: {
        text: 'Pocetna poruka.'
      }
    }
  };
  request.post(url, json);
  console.log('Greeting message added');
};


const prestantMenu = () => {
  const json = {
    form: {
      'setting_type': 'call_to_actions',
      'thread_state': 'existing_thread',
      'call_to_actions': [{
        'type': 'postback',
        'title': 'Help',
        'payload': 'DEVELOPER_DEFINED_PAYLOAD_FOR_HELP'
      },
      {
        'type': 'postback',
        'title': 'Latest Posts',
        'payload': 'DEVELOPER_DEFINED_PAYLOAD_FOR_LATEST_POSTS'
      },
      {
        'type': 'web_url',
        'title': 'View Website',
        'url': 'http://yoursite.com/'
      }
      ]
    }
  };
  request.post(url, json);
};

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
      payload: (payloads && payloads[i] ? payloads[i] : text)
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
};

const sendGenericTemplate = async (sender, type) => {
  let title;
  let image_url;
  let subtitle;

  if (type === 'STUDENT_INFO') {
    const student = await getStudentById(sender);
    title = `${student.firstName} (${student.parentName}) ${student.lastName} - ${student.field} - ${student.year}`;
    image_url = student.image;
    subtitle = `${student.gender} ${student.jmbg} ${student.address}`;
  }
  const messageData = {
    attachment: {
      type: 'template',
      payload: {
        image_aspect_ratio: 'square',
        'template_type': 'generic',
        'elements': [{
          title,
          image_url,
          subtitle,
          /*buttons: [
                                      {
                                      "type": "web_url",
                                      "url": "https://petersfancybrownhats.com",
                                      "title": "View Website"
                                  }, {
                                      "type": "postback",
                                      "title": "Start Chatting",
                                      "payload": "DEVELOPER_DEFINED_PAYLOAD"
                                  }
                              ]
                              */
        }]
      }
    }
  };
  await sendRequest(messageData, sender);
};


const sendCourseGenericTemplate = async (sender, courses) => {
  // TODO fix this
  courses = courses.slice(0,10);
  const messageData = {
    attachment: {
      type: 'template',
      payload: {
        image_aspect_ratio: 'square',
        template_type: 'generic',
        elements: []
      }
    }
  };
  courses.forEach((course, index) => {
    messageData.attachment.payload.elements.push({
      title: `${course.name}`,
      subtitle: `Sifra: ${course.code}\nESBP: ${course.esbp} \nStatus: ${course.status}\nYear: ${course.year}`,
      // image_url:
      buttons: [
        {
          type: 'web_url',
          url: course.url,
          title: '📃 Sajt predmeta'
        },
        {
          type: 'postback',
          title: 'Cilj predemeta ',
          payload: `COURSE/GOALS/${course._id}`
        },
        {
          type: 'postback',
          title: 'Sadrzaj predmeta ',
          payload: `COURSE/CONTENT/${course._id}`
        }
      ]
    });
  });
  await sendRequest(messageData, sender);
};

const sendProffesorGenericTemplate = async (sender, professors) => {
  professors = professors.slice(0,10);
  console.log(professors)
  const messageData = {
    attachment: {
      type: 'template',
      payload: {
        image_aspect_ratio: 'square',
        template_type: 'generic',
        elements: []
      }
    }
  };
  professors.forEach((professor, index) => {
    messageData.attachment.payload.elements.push({
      title: `${professors.title} ${professors.firstName}${professors.lastName}`,
      subtitle: `ESBP: ${professors.espb} Status: ${professors.status}`,
      image_url: professors.image,
      buttons: [
        {
          type: 'postback',
          title: 'Contact',
          payload: `PROFESSOR_CONTACT/${professor._id}`
        },
        {
          type: 'postback',
          title: 'Konsultacije',
          payload: `CONSULTATION/${professor._id}`
        }
      ]
    });
  });
  await sendRequest(messageData, sender);
};


const sendLocationButton = async (sender) => {
  const etfOnMap = 'https://www.google.com/maps/place/44%C2%B048\'19.9%22N+20%C2%B028\'34.0%22E/@44.8055162,20.4753893,18z/data=!4m6!3m5!1s0x0:0x0!7e2!8m2!3d44.8055276!4d20.4761055';
  const messageData = {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: 'Kliknite na ⤵ dugme ispod da vidite gde se ETF nalazi! ',
        buttons: [{
          type: 'web_url',
          url: etfOnMap,
          messenger_extensions: 'true',
          webview_height_ratio: 'tall',
          title: '🗺 ETF MAP'
        }]
      }
    }
  };
  await sendRequest(messageData, sender);
};
// sendLocationButton('1898032266921906');
const sendHelpButton = async (sender) => {
  const messageData = {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'button',
        text: 'Kliknite na ⤵ dugme ispod kako bi razovarali sa pravom osobom!',
        buttons: [{
          title: '☎️ Pricaj sa osobom',
          type: 'postback',
          payload: 'HELP'
        }]
      }
    }
  };
  await sendRequest(messageData, sender);
};

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
};
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
  typing,
  typingOn,
  sendTextMessage,
  sendQuickReply,
  sendGenericTemplate,
  sendImage,
  sendLocationButton,
  sendHelpButton,
  sendCourseGenericTemplate,
  sendProffesorGenericTemplate
};