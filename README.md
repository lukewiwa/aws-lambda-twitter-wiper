# Tweet Delete Periodic AWS Lambda

An over-engineered implementation of a cloud function to periodically delete your tweets and likes.

# Development

### requirements

- docker
- AWS User with permission (thereabouts):
    - arn:aws:iam::aws:policy/AWSCloudFormationFullAccess
    - arn:aws:iam::aws:policy/AWSLambda_FullAccess
    - arn:aws:iam::aws:policy/CloudWatchEventsFullAccess
    - arn:aws:iam::aws:policy/AmazonEventBridgeFullAccess
    - arn:aws:iam::aws:policy/AmazonS3FullAccess
- [Twitter Developer app](https://developer.twitter.com/en/portal/projects-and-apps) with credentials

## Setup

Use the `.env.example` file to create a `.env` file with the necessary environment variables. To allow docker to build the lambda function we need to mirror your local directory structure in the docker container, therefore it is necessary to set the `PROJECT_DIR` variable in the `.env` file as the absolute path to your local repository. To jump into a shell you can use vscode devcontainers or simply run the command:

```bash
make shell
```


# Deploy

```bash
cd tweet-delete
npm run synth
npm run bootstrap  # Required if this is your first CDK project in your AWS account
npm run deploy
```