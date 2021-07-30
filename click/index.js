"use strict";

const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns");

exports.handler = async (event, context) => {
  console.log("summoning event:");
  console.log(event);
  console.log("summoning context:");
  console.log(context);
  const region = process.env.REGION;
  const topicArn = process.env.TOPIC_ARN;
  const client = new SNSClient({ region });
  const summoningDate = new Date();
  const message = `You have been summoned, at ${summoningDate}.`;
  const publishParams = { TopicArn: topicArn, Message: message };
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
