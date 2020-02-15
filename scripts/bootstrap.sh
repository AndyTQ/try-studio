#!/bin/bash

install_homebrew() {
  echo "Installing Homebrew"
  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
}

install_docker() {
  echo "Installing Docker"
  brew cask install docker
}

install_docker-compose() {
  echo "Installing Docker-Compose"
  brew install docker-compose
}

install_yarn() {
  echo "Installing Yarn"
  brew install yarn
}

copy_env() {
  echo "Copying .env"
  cp ../.env-example ../.env
}

if [ ! "$(uname)" == "Darwin" ]; then
  echo "Bootstrap only supports MacOS"
  exit 1
fi
    
if [ ! which brew > /dev/null 2>&1 ]; then
  install_homebrew
else
  echo "Homebrew already installed"
fi

if [ ! which docker > /dev/null 2>&1 ]; then
  install_docker
else
  echo "Docker already installed"
fi

if [ ! which docker-compose > /dev/null 2>&1 ]; then
  install_docker-compose
else
  echo "Docker-compose already installed"
fi

if [ ! which yarn > /dev/null 2>&1 ]; then
  install_yarn
else
  echo "Yarn already installed"
fi

if [ ! -f ./.env ]; then
  copy_env
else
  echo ".env already exists"
fi

cd .. && docker-compose up -d --build 
