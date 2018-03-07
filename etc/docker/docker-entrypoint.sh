#!/usr/bin/env bash

set -e

perl -pi -e 's/\{\{API_URL\}\}/$ENV{'API_URL'}/g' /usr/share/nginx/html/static/js/*
perl -pi -e 's/\{\{REHIVE_API_URL\}\}/$ENV{'REHIVE_API_URL'}/g' /usr/share/nginx/html/static/js/*

exec "$@"
