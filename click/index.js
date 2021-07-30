"use strict";

const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

exports.handler = async (event, context) => {
  console.log("this lambda was called...I'd like to publish to a topic...");
  const region = process.env.REGION;
  const topicArn = process.env.TOPIC_ARN;
  const client = new SNSClient({ region });
  const summoningDate = new Date();
  const message = `You have been summoned, at ${summoningDate}.`;
  const publishParams = { TopicArn: topicArn, Message: "This is a summoning." };
  const publishCommand = new PublishCommand(publishParams);
  try {
    const data = await client.send(publishCommand);
    console.log("publishing succeeded");
    console.log(data);
  } catch (error) {
    console.error("publishing failed");
    console.error(error);
  }
};
