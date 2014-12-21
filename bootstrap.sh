#!/usr/bin/env bash

apt-get update
apt-get install -y nodejs
apt-get install -y npm
apt-get install -y mysql-server-5.5
apt-get install -y mysql-client
apt-get install -y redis-server
apt-get install -y tmux

npm install supervisor -g
