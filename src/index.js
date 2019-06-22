'use strict';

const axios = require('axios');

// Environment Variables

const serverurl = process.env.SERVER_URL;
const channelName = process.env.CHANNELNAME;

// Global Speechtext Variable

var speechText;

// Function To Get Message From Rocket Chat Server. Make sure you have 'Anonymous Read Enabled'.

const flashBriefingMessage = async () => {
	await axios
	.get(`${ serverurl }/api/v1/channels.anonymousread?roomName=${ channelName }`)
    .then((res) =>  {

		speechText = res.data.messages[0].msg;
		console.log(res.data.messages[0].msg);
		

	})
	.catch((err) => {
		console.log(err.message);
	});
};

// Getting Date & Time.

const now = new Date();
const jsonDate = now.toJSON();

// Please Change Skill Title As Per Your Requirement Here.

const skillTitle = 'Rocket Chat Flash Briefing';


exports.handler = async function(event, context, callback) {
    await flashBriefingMessage();
    console.log(JSON.stringify(event));
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            uid: 'urn:uuid:1335c695-cfb8-4ebb-abbd-81da344efa6b',
            updateDate: jsonDate,
            titleText: skillTitle,
            mainText: speechText,
            redirectionUrl : `${ serverurl }/channel/${ channelName }`
        })
    };
    callback(null, response);
};
