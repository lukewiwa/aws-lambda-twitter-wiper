#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { TweetDeleteStack } from '../lib/tweet-delete-stack';

const app = new cdk.App();
new TweetDeleteStack(app, 'TweetDeleteStack');
