import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import { Effect, PolicyStatement } from "@aws-cdk/aws-iam";

export interface SummoningButtonProps extends cdk.StackProps {
  snsTopicArn?: string;
}

export class SummoningButtonApp extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props: SummoningButtonProps = {}) {
    super(scope, id, props);

    const { snsTopicArn } = props;

    const fn = new lambda.Function(this, "ClickHandler", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset("click"),
      memorySize: 3000,
      environment: {
        NODE_ENV: "production",
        REGION: this.region,
      },
      timeout: cdk.Duration.seconds(20),
    });

    fn.addToRolePolicy(
      // it needs to publish to the SNS topic
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ["cognito-idp:DescribeUserPoolClient"],
        resources: [`arn:aws:`],
      })
    );

    new cdk.CfnOutput(this, "ClickHandlerName", {
      value: fn.functionName,
    });
  }
}
