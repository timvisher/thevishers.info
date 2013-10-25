#!/usr/bin/env bash

set -eux

. ../../build-functions.sh

smkdir publish

cp -R _ *.html publish/
