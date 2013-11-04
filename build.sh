#!/usr/bin/env bash

set -eux

. build-functions.sh

smkdir publish

root_dir=$PWD

for build_file in $(find src -name build.sh -type f)
do
  cd $root_dir/$(dirname $build_file)
  ./build.sh
done

cd $root_dir

for publish_root in $(find src -name publish -type d)
do
  a=${publish_root#*/}
  b=${a%*publish}
  smkdirp publish/$b
  rsync -avP --delete $publish_root/* publish/$b
done
