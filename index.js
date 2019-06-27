const express = require("express");
const axios = require('axios');
const app = express();
const cache = require('memory-cache');
const fs = require('fs');
const download = require('download');

require('dotenv').config();

app.use(express.json());
app.use(express.static('dist'))

// Environment Variables

const PORT = process.env.PORT || 3000;
const serverurl = process.env.SERVER_URL;
const fbserverurl = process.env.FBSERVER_URL;
const channelName = process.env.CHANNEL_NAME;
const userName = process.env.USER_NAME;
const passWord = process.env.PASSWORD;

//Data Frequency Timing in ms & Title Text

const cacheTimeout = 300000; //300000ms = 5mins
const flashBriefingTitle = 'Rocket Chat Flash Briefing';

//Login

const login = async (userName, passWord) =>
  await axios
  .post(`${ serverurl }/api/v1/login`, {
    user: userName,
    password: passWord,
  })
  .then((res) => res.data)
  .then((res) => {
    console.log(res);
    const headers = {
      'X-Auth-Token': res.data.authToken,
      'X-User-Id': res.data.userId,
    };
    return headers;
  })
  .catch((err) => {
    console.log(err);
  });

// Get File Type

const getFileType = async () =>
  await axios
  .get(`${ serverurl }/api/v1/channels.anonymousread?roomName=${ channelName }`)
  .then((res) => res.data)
  .then((res) => `${ res.messages[0].file.type }`)
  .catch((err) => {
    console.log(err.message);
  });

//Get File Download URL

const getLastMessageFileURL = async (channelName, headers) =>
  await axios
  .get(`${ serverurl }/api/v1/channels.messages?roomName=${ channelName }`, {
    headers
  })
  .then((res) => res.data)
  .then((res) => `https://bots.rocket.chat/file-upload/${ res.messages[0].file._id }/${res.messages[0].file.name}`)
  .catch((err) => {
    console.log(err.message);
  });

//Get S3 URL

const getLastMessageFileDowloadURL = async (downloadURL, headers) =>
  await axios
  .get(downloadURL, {
    headers
  })
  .then((response) => `${ response.request.res.responseUrl }`)
  .catch((err) => {
    console.log(err.message);
  });

//Download And Save To Local Storage
async function downloadAudio(S3Url) {

  download(S3Url).then(data => {
    fs.writeFileSync('audioFolder/audioFile.mp3', data);
  });

}

//PING ROUTE

app.get('/ping', (req, res) => {

  console.log('PING Request');

  const pongData = ('{"data":"PONG"}');
  var pong = JSON.parse(pongData);
  return res.status(200).send(pong);

})

//MAIN ROUTE

app.get('/', async (req, res) => {

  if (cache.get('message')) {

    console.log('Using Cached Data From Memory');

    const resultJSON = JSON.parse(cache.get('message'));
    return res.status(200).send(resultJSON);

  } else {

    console.log('Getting New Data From Rocket Chat Server');

    var filetype = await getFileType();

    if (filetype) {
      console.log(filetype);

      var headers = await login(userName, passWord);
      var downloadURL = await getLastMessageFileURL(channelName, headers);
      var S3Url = await getLastMessageFileDowloadURL(downloadURL, headers);
      await downloadAudio(S3Url);

      return axios.get(`${ serverurl }/api/v1/channels.anonymousread?roomName=${ channelName }`)
        .then(response => {

          const responseJSON = JSON.stringify({
            uid: response.data.messages[0]._id,
            updateDate: response.data.messages[0].ts,
            titleText: flashBriefingTitle,
            mainText: response.data.messages[0].msg,
            streamUrl: `https://${fbserverurl}/download`,
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

    } else {
      console.log('text message');

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



  }
});

app.get('/download', (req, res) => {
  const file = __dirname + '/audioFolder/audioFile.mp3';
  res.download(file);
});

app.listen(PORT, '0.0.0.0', function () {
  console.log(`Server Now Listening on Port ${PORT}`);
});
