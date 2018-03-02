#!/usr/bin/env bash

#Commented out everything for launcher service

#set -e

#perl -pi -e 's/\{\{API_URL\}\}/$ENV{'API_URL'}/g' /usr/share/nginx/html/scripts/*

exec "$@"
