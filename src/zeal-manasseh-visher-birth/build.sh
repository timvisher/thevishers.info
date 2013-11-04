#!/usr/bin/env bash

set -eux

. ../../build-functions.sh

smkdir publish

rsync -avP _ *.html publish/
