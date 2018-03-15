#!/usr/bin/env bash

set -e

perl -pi -e 's/\{\{API_URL\}\}/$ENV{'API_URL'}/g' /usr/share/nginx/html/static/js/*
perl -pi -e 's/\{\{REHIVE_API_URL\}\}/$ENV{'REHIVE_API_URL'}/g' /usr/share/nginx/html/static/js/*
perl -pi -e 's/\{\{STELLAR_SERVICE_URL\}\}/$ENV{'STELLAR_SERVICE_URL'}/g' /usr/share/nginx/html/static/js/*
perl -pi -e 's/\{\{COMPANY_IDENTIFIER\}\}/$ENV{'COMPANY_IDENTIFIER'}/g' /usr/share/nginx/html/static/js/*

exec "$@"
