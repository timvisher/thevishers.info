#!/usr/bin/env bash

set -eu

set -x

for i in src/rhythm-noel-visher-birth/src/images/*full.jpg
do
  mi=$(sed s/-full.jpg/-medium.jpg/ <<< $i)
  convert -resize 1000x $i $mi
  identify $mi
done
