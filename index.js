const express = require("express");
const axios = require('axios');
const app = express();

// Environment Variables

const PORT = process.env.PORT || 3000;
var client = require('redis').createClient(process.env.REDIS_URL);

// Environment Variables

const serverurl = process.env.SERVER_URL;
const channelName = process.env.CHANNEL_NAME;
const flashBriefingTitle = process.env.TITLE_TEXT;
const cacheTimeout = process.env.CACHE_TTL;


client.on('error', (err) => {
  console.log("Error " + err);
});

app.use(express.json());


app.get('/', (req, res) => {

  return client.get(`redisdb:message`, (err, result) => {

    if (result) {
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    } else {
      return axios.get(`${ serverurl }/api/v1/channels.anonymousread?roomName=${ channelName }`)
        .then(response => {

          const responseJSON = JSON.stringify({
            uid: response.data.messages[0]._id,
            updateDate: response.data.messages[0].ts,
            titleText: flashBriefingTitle,
            mainText: response.data.messages[0].msg,
            redirectionUrl: `${ serverurl }/channel/${ channelName }`
          });

          client.setex(`redisdb:message`, cacheTimeout, responseJSON);
          
          const result = JSON.parse(responseJSON);
          return res.status(200).json(result);
        })
        .catch(err => {
          return res.json(err);
        });
    }
  });
});




app.listen(PORT, function () {
  console.log(`Listening on Port ${PORT}`);
});
