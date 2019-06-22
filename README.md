# Rocket Chat Flash Briefing
Flash Briefing Skill - Powered By Rocket.Chat

***

# Let's Get Started

Deploy your Flash briefing skill in minutes using Rocket chat and broadcast messages on both channel and skill in realtime.

# Repository Contents

* `lambdaFunc.zip` - Deploy file for Lambda Functions consists of backend code and node modules.
* `/src` - Back-End Logic for the Alexa Skill hosted on [AWS Lambda](https://aws.amazon.com/lambda/).


# Setup

### Pre-requisites

* Node.js (> v8.10)
* Register for an [AWS Account](https://aws.amazon.com/)
* Register for an [Amazon Developer Account](https://developer.amazon.com/)
* Rocket Chat Server updated to Release 1.2.0-rc.0 or later.

### Enabling Anonymous Read

* Go to **Server** -> **Three Dot Menu** -> **Administration** -> **Accounts** , and Set **Allow Anonymous Read** to **True**.

**Note:** Requires Admin Access.

### Getting Repository Contents

* Clone The Repository,

  `git clone https://github.com/PrajvalRaval/rocket-chat-flash-briefing.git`

### Creating Broadcast Channel

* On Server Homepage click on **Create New** -> **Channel**

* Set **Private Channel** -> **Public Channel** and Enable **Broadcast Channel**.

* Then give your **Channel Name**, and click on **Create**.

### Creating Lambda Fucntion

* Go To [Lambda Management Console](https://console.aws.amazon.com/lambda/home?region=us-east-1#/functions)

* Click on **Create Function**

* Choose **Author From Scratch** and fill in your **Function name**.

* Make Sure Your **Runtime** is `> v8.10` and click on **Create Function**.

* Now in **Function code**, choose **Upload A .zip file** and upload **lambdaFunc.zip** file and click **Save**.

* Create Two Environment Variables and hit **Save**
  
  1. **SERVER_URL**    https://yourservername.rocket.chat
	2. **CHANNELNAME**    (The name of the Broadcast Channel we created earlier, make sure its in lower case with no spaces)
  
* Add **API Gateway** Trigger. Select **Create A New API**, for security choose **Open** and then click on **Add**. Finally click **Save**.

* We will be using **API endpoint** in the next step. You can also change skill title as per you need in code.

### Creating Flash Briefing Skill

* Go [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask).

* Click on **Create Skill**, give **Skill name** , **Default language** and choose **Flash Briefing** model then click on **Create Skill**.

* Write **Custom Error Message**, then click on **Add new feed**. Fill details as per you requirement.

* Choose **Content type** as **Text**.

* In **Feed**, paste the **API endpoint URL**.

* Upload Photo and hit **Add**.

* Click on **Save** and that should complete the complete the process.

