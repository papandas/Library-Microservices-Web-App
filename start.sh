#!/bin/bash
set -x

./stop.sh

rm -rf ./nginx/log
mkdir -p ./nginx/log

docker-compose -f docker-compose.yml up

# tail -F nginx/log/error.log nginx/log/access.log

# Run MongoDB stand-alone
# docker run -p 27017:27017 --name mongodb -d mongo

# Bring down MongoDB container
# docker rm -f mongodb
