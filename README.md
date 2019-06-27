# Rocket Chat Flash Briefing
Flash Briefing Skill - Powered By Rocket.Chat

***

# Let's Get Started

Deploy your Flash briefing skill in minutes using Rocket chat and broadcast messages on both channel and skill in realtime.

# Setup

### Pre-requisites

* Node.js (> v8.10)
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

* Get Repository Contents using the following command:
   
   `git clone https://github.com/PrajvalRaval/rc-flashbriefing-server.git`
   
* After cloning create a **.env** file with following environment variables:

  * **PORT** : Enter The Port number you want server to run on.
  
  * **CHANNEL_NAME** : Enter the name of the broadcasting channel we created earlier. Make sure its in lower case with no spaces.

  * **SERVER_URL** : Enter your current Rocket.Chat server url here. Ex- https://your.sever.chat
  
  * **FBSERVER_URL** : Enter your the server URL where this node app is deploy.
  
  * **USER_NAME** : Enter your Rocket.Chat username.
  
  * **PASSWORD** : Enter your Rocket.chat password.

* Change **cacheTimeout** & **flashBriefingTitle** from **index.js** as per your requirement.

  * **cacheTimeout** : It is the frequency of your message update. For example if you want your flash briefing to update data every hour then set the value of cacheTimeout to `3600000` i.e one hour in milliseconds.
  
  * **flashBriefingTitle** : The title of the feed item to display in the Alexa app.

* Deploy the code to the server of your choice along.

* Make sure it's working on an **HTTPS** domain if not then assign a **HTTPS** domain to it.You can then test your server by sending `/ping` or `/download` request.

* After App is deployed we will be using **URL/Domain** of the server in the next step.

### Creating Flash Briefing Skill

* Go [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask).

* Click on **Create Skill**, give **Skill name** , **Default language** and choose **Flash Briefing** model then click on **Create Skill**.

* Write **Custom Error Message**, then click on **Add new feed**. Fill details as per you requirement.

* Choose **Content type** as **Text**.

* In **Feed**, paste the **URL/Domain**.

* Upload Photo and hit **Add**.

* Click on **Save** and that should complete the complete the process.

## Usage

* Flash briefing will use the **last message** on the broadcast channel for broadcasting.

* Make sure that the last message is either a **text message** or **audio message** and not other file types such as *images or videos*.

# TODOs

Need community help in the following:

* add a conversation flow to allow an admin to "publish the briefing" daily using the VUI
