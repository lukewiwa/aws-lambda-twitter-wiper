import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import { PythonFunction } from "@aws-cdk/aws-lambda-python";
import { Rule, Schedule } from "@aws-cdk/aws-events";
import { LambdaFunction } from "@aws-cdk/aws-events-targets";
import * as path from "path";
import { Duration } from "@aws-cdk/core";

export class TweetDeleteStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const TweetDeleteFn = new PythonFunction(this, "TweetDeleteFunction", {
      entry: path.join(__dirname, "..", "src"),
      runtime: lambda.Runtime.PYTHON_3_8,
      environment: {
        TWITTER_API_KEY: process.env.TWITTER_API_KEY ?? "",
        TWITTER_API_SECRET: process.env.TWITTER_API_SECRET ?? "",
        TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN ?? "",
        TWITTER_ACCESS_TOKEN_SECRET:
          process.env.TWITTER_ACCESS_TOKEN_SECRET ?? "",
      },
      timeout: Duration.seconds(60),
    });

    const TweetDeleteFnTarget = new LambdaFunction(TweetDeleteFn);

    new Rule(this, "TweetDeleteSchedule", {
      schedule: Schedule.cron({
        minute: "23",
        hour: "16",
        day: "*",
        month: "*",
      }),
      targets: [TweetDeleteFnTarget],
    });
  }
}
