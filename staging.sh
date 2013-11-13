#!/usr/bin/env bash

set -eu

# set -x

cd publish

aws --profile p_s3 s3 sync --delete --exclude "*rhythm-noel-visher-birth/*" . s3://staging.thevishers.info

aws --profile p_s3 s3 sync --delete --exclude "*" --include "*rhythm-noel-visher-birth/*html" . s3://staging.thevishers.info

aws --profile p_s3 s3 sync --delete --exclude "*" --include "*rhythm-noel-visher-birth/*" --exclude "*html" --cache-control "max-age=31536000, public" . s3://staging.thevishers.info
