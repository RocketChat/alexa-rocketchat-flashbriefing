const express = require("express");
const axios = require('axios');
const app = express();
var cache = require('memory-cache');

require('dotenv').config()
app.use(express.json());

// Environment Variables

const PORT = process.env.PORT || 3000;
const serverurl = process.env.SERVER_URL;
const channelName = process.env.CHANNEL_NAME;

//Data Frequency Timing in ms & Title Text

const cacheTimeout = 300000; //300000ms = 5mins
const flashBriefingTitle = 'Rocket Chat Flash Briefing';

//PING ROUTE

app.get('/ping', (req,res) => {

  console.log('PING Request');

  const pongData = ('{"data":"PONG"}');
  var pong = JSON.parse(pongData);
  return res.status(200).send(pong);

})

//MAIN ROUTE

app.get('/', (req,res) => {

  if (cache.get('message')) {

    console.log('Using Cached Data From Memory');

    const resultJSON = JSON.parse(cache.get('message'));
    return res.status(200).send(resultJSON);

  } else {

    console.log('Getting New Data From Rocket Chat Server');

    return axios.get(`${ serverurl }/api/v1/channels.anonymousread?roomName=${ channelName }`)
      .then(response => {

        const responseJSON = JSON.stringify({
          uid: response.data.messages[0]._id,
          updateDate: response.data.messages[0].ts,
          titleText: flashBriefingTitle,
          mainText: response.data.messages[0].msg,
          redirectionUrl: `${ serverurl }/channel/${ channelName }`
        });

        console.log('Storing Data In Memory.')
        cache.put('message', responseJSON, cacheTimeout);

        const result = JSON.parse(responseJSON);
        return res.status(200).send(result);
      })
      .catch(err => {
        console.log(err);
        return res.status(200).send(err);
      });

  }
});

app.listen(PORT,'0.0.0.0', function () {
  console.log(`Server Now Listening on Port ${PORT}`);
});
