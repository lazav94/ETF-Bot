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
    title = `${student.firstName} (${student.parentName}) ${student.lastName} - ${student.field} `;
    image_url = student.image;
    subtitle = `Pol: ${student.gender}\nJMBG: ${student.jmbg}\nAdresa: ${student.addressOfBirth}\nYear: ${student.year}`;
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


const sendCourseGenericTemplate = async (sender, courses, apply) => {
  // TODO fix this
  if (!courses || courses.length === 0) {
    await sendTextMessage(sender, 'Nema ispita koje mozete prijaviti :D');
    return;
  } else {

    courses = courses.slice(0, 10);
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
    courses.forEach((course) => {
      messageData.attachment.payload.elements.push({
        title: `${course.name}`,
        subtitle: `Sifra: ${course.code}\nESBP: ${course.esbp} \nStatus: ${course.status}\nYear: ${course.year}`,
        // image_url:
        default_action: {
          type: 'web_url',
          url: course.url,
          messenger_extensions: false,
          webview_height_ratio: 'tall'
        },
        buttons: [{
          type: 'postback',
          title: 'Cilj predemeta ',
          payload: `COURSE/GOALS/${course._id}`
        },
        {
          type: 'postback',
          title: 'Sadrzaj predmeta ',
          payload: `COURSE/CONTENT/${course._id}`
        },
        ...((apply) ? [{
          type: 'postback',
          title: 'Prijavi predmet',
          payload: `COURSE/APPLY/${course._id}`
        }] : [{
          type: 'web_url',
          url: course.url,
          title: '📃 Sajt predmeta'
        }])
        ]
      });
    });
    await sendRequest(messageData, sender);
  }
};

const sendProffesorGenericTemplate = async (sender, professors) => {
  professors = professors.slice(0, 10);
  console.log(professors);

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
  await Promise.all(professors.map((professor, index) => {
    messageData.attachment.payload.elements.push({
      title: `${professor.title} ${professor.firstName} ${professor.lastName}`,
      subtitle: `Email: ${professor.email}\nPhone: ${professor.phone}\nOffice:  ${professor.office}`,
      image_url: professor.image,
      buttons: [{
        type: 'postback',
        title: 'Kontakt',
        payload: `PROFESSOR/CONTACT/${professor._id}`
      },
      {
        type: 'postback',
        title: 'Konsultacije',
        payload: `PROFESSOR/CONSULTATION/${professor._id}`
      }
      ]
    });
  }));
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