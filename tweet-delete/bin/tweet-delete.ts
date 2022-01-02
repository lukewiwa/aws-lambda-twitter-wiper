#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from "aws-cdk-lib";
import { TweetDeleteStack } from '../lib/tweet-delete-stack';

const app = new cdk.App();
new TweetDeleteStack(app, 'TweetDeleteStack');
