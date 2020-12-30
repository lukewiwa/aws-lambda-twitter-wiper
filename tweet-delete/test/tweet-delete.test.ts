import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import * as TweetDelete from '../lib/tweet-delete-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new TweetDelete.TweetDeleteStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.EXACT))
});
