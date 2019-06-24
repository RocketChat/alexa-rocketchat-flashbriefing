# Rocket Chat Flash Briefing
Flash Briefing Skill - Powered By Rocket.Chat

***

# Let's Get Started

Deploy your Flash briefing skill in minutes using Rocket chat and broadcast messages on both channel and skill in realtime.

# Repository Contents

* `index.js` - Back-End Logic for the Alexa Flash Briefing Skill hosted on [Heroku](https://www.heroku.com/)
* `app.json` - It is a manifest format for describing web apps. It declares environment variables, add-ons, and other information required to run an app on Heroku.


# Setup

### Pre-requisites

* Node.js (> v8.10)
* Register for a [Heroku Account](https://www.heroku.com/)
* Register for an [Amazon Developer Account](https://developer.amazon.com/)
* Rocket Chat Server updated to Release 1.2.0-rc.0 or later.

### Enabling Anonymous Read

* Go to **Server** -> **Three Dot Menu** -> **Administration** -> **Accounts** , and Set **Allow Anonymous Read** to **True**.

**Note:** Requires Admin Access.

### Creating Broadcast Channel

* On Server Homepage click on **Create New** -> **Channel**

* Set **Private Channel** -> **Public Channel** and Enable **Broadcast Channel**.

* Then give your **Channel Name**, and click on **Create**.

### Deploying Code

* Click on the following button,

  [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

* **CACHE_TTL** : It is used by Redis to store your data for the given period of time. You may enter your desire frequency in seconds. For ex: If you are going to post news every 24 Hrs enter `86400`. Now your data will be updated every 24 hrs. This step helps admins to save cost as by caching data.

* **CHANNEL_NAME** : Enter the name of the broadcasting channel we created earlier. Make sure its in lower case with no spaces.

* **REDIS_URL** : A Redis instance is automatically created when you deploy this app and its location is stored in this variable.

* **SERVER_URL** : Enter your current Rocket.Chat server url here. Ex- https://your.sever.chat

* **TITLE_TEXT** : The title of the feed item to display in the Alexa app.

* After App is deployed you can find your **API endpoint URL** here, **Manage App** -> **Settings** -> **Domains and certificates** -> **Domain**. We will using it in the next step.

### Creating Flash Briefing Skill

* Go [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask).

* Click on **Create Skill**, give **Skill name** , **Default language** and choose **Flash Briefing** model then click on **Create Skill**.

* Write **Custom Error Message**, then click on **Add new feed**. Fill details as per you requirement.

* Choose **Content type** as **Text**.

* In **Feed**, paste the **API endpoint URL**.

* Upload Photo and hit **Add**.

* Click on **Save** and that should complete the complete the process.

# TODOs

Need community help in the following:

* externalize it to a nodeJS server, to handle "hundreds of flash briefings across hundreds of RCs" for millions of users - reduce Lamda cost and create  "flash breifing publishing as a service"
* add caching to significantly reduce lambda cost 
* add a conversation flow to allow an admin to "publish the briefing" daily using the VUI
* add support for audio content for more personal flash breifing delivery
