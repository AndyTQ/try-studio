#!/bin/bash

docker-compose down
docker rmi $(docker images | grep 'client') $(docker images | grep 'server')
docker-compose volume prune -f
docker-compose up -d --build
