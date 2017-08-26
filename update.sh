#!/bin/bash

set -e

cd $(dirname "$0")

# Only required once, but faster than a "build" and this script should be
# invoked rarely.
npm install
npm run build
cd ../..
./bin/quip-elements pack elements/fsc-news/element
