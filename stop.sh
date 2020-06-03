#!/bin/bash
set -x

#docker-compose -f docker-compose.yaml kill
docker-compose -f docker-compose.yml down

docker rm -f $(docker ps -aq)