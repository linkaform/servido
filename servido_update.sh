#!/bin/bash

set -xe
cd ~/lkf/servido
git checkout master
git pull origin master
(
        cd apps/custom
        git submodule foreach --recursive git checkout master
        git submodule foreach --recursive git pull origin master
)
./srv -p build master
