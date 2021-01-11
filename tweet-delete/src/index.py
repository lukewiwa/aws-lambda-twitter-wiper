import os
import logging

from twython import Twython


logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
if not logger.hasHandlers():
    handler = logging.StreamHandler()
    handler.setLevel(logging.INFO)
    logger.addHandler(handler)


TWITTER_API_KEY = os.getenv("TWITTER_API_KEY")
TWITTER_API_SECRET = os.getenv("TWITTER_API_SECRET")
TWITTER_ACCESS_TOKEN = os.getenv("TWITTER_ACCESS_TOKEN")
TWITTER_ACCESS_TOKEN_SECRET = os.getenv("TWITTER_ACCESS_TOKEN_SECRET")


twitter = Twython(
    TWITTER_API_KEY,
    TWITTER_API_SECRET,
    TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_TOKEN_SECRET,
)

SCREEN_NAME = twitter.verify_credentials()["screen_name"]

TWEET_LIMIT = 40


def handler(event, context):

    recent_tweets = twitter.get_user_timeline(
        screen_name=SCREEN_NAME, count=TWEET_LIMIT
    )
    if len(recent_tweets) <= TWEET_LIMIT:
        pass

    max_id = recent_tweets[-1]["id"]

    current_tweet_count = 1
    while current_tweet_count > 0:
        tweets = twitter.get_user_timeline(
            screen_name=SCREEN_NAME, count=200, max_id=max_id
        )

        # Drop first tweet which is our reference tweet
        tweets = tweets[1:]

        for tweet in tweets:
            tweet_id = tweet["id"]
            tweet_text = tweet["text"]
            twitter.destroy_status(id=tweet["id"])
            logger.info(f"Deleted: <{tweet_id}> '{tweet_text}'")

        current_tweet_count = len(
            twitter.get_user_timeline(screen_name=SCREEN_NAME, count=2, max_id=max_id)[
                1:
            ]
        )

    fav_count = 1
    while fav_count > 0:
        favs = twitter.get_favorites(count=200)
        for fav in favs:
            fav_id = fav["id"]
            fav_text = fav["text"]
            twitter.destroy_favorite(id=fav_id)
            logger.info(f"Unliked: <{fav_id}> '{fav_text}'")

        fav_count = len(twitter.get_favorites(count=1))
