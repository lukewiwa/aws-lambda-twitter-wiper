#!/bin/bash
set -e

npm install --prefix=${PROJECT_DIR}/tweet-delete/
python -m pip install -r ${PROJECT_DIR}/tweet-delete/src/requirements.txt
python -m pip install -r ${PROJECT_DIR}/tweet-delete/src/requirements.dev.txt

exec "$@"