#!/usr/bin/env bash

set -eu

# set -x

cd publish

aws --profile p_s3 s3 sync --delete . s3://staging.thevishers.info
