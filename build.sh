#!/bin/bash
set -x

# Remove the previous images
docker rmi -f $(docker images services_* -q)

sleep 1

cd books
docker build -t services_books .

cd ../customers
docker build -t services_customers .

cd ../orders
docker build -t services_orders .

cd ../web
docker build -t services_webapp .