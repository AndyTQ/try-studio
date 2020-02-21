#!/bin/bash

if [ ! "$(uname)" == "Darwin" ]; then
  echo "Bootstrap only supports MacOS"
  exit 1
fi

if [[ ! "$PWD" =~ scripts ]]; then
  echo "Please run in the scripts folder"
  exit 1
fi

cd ..
docker-compose down
docker rmi $(docker images | grep 'client') $(docker images | grep 'server')
docker-compose volume prune -f
docker-compose up -d --build

docker-compose up -d --build 
