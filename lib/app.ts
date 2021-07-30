import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as sns from "@aws-cdk/aws-sns";
import * as subscriptions from "@aws-cdk/aws-sns-subscriptions";
import { Effect, PolicyStatement } from "@aws-cdk/aws-iam";

export interface SummoningButtonProps extends cdk.StackProps {
  snsTopicArn?: string;
  subscriberPhoneNumber?: string;
}

export class SummoningButtonApp extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: SummoningButtonProps = {}) {
    super(scope, id, props);

    const { snsTopicArn, subscriberPhoneNumber } = props;

    const topic = new sns.Topic(this, "SummoningTopic", {
      fifo: false,
    });

    const fn = new lambda.Function(this, "ClickHandler", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("click"),
      memorySize: 3000,
      environment: {
        REGION: this.region,
        TOPIC_ARN: topic.topicArn,
      },
      timeout: cdk.Duration.seconds(20),
    });

    topic.grantPublish(fn);

    if (subscriberPhoneNumber) {
      topic.addSubscription(
        new subscriptions.SmsSubscription(subscriberPhoneNumber)
      );
    }

    new cdk.CfnOutput(this, "ClickHandlerName", {
      value: fn.functionName,
    });
  }
}
