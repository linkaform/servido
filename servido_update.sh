#!/bin/bash


cd ~/lkf/servido
git checkout master
git pull origin master
cd apps/custom
git submodule foreach --recursive git checkout master
git submodule foreach --recursive git pull origin master
cd ../..
./srv -p build master
