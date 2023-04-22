#! /bin/bash

if [ -d "./nodejs" ] #check to see if directoy already exists
then
    rm -r nodejs
fi
mkdir nodejs
cp openapi.json ./terraform
cp package.json package-lock.json ./prisma/schema.prisma ./nodejs
cp package.json openapi.json ./build
cd nodejs && npm ci -production && cd ..
zip -FSr -j ./terraform/app.zip ./build/
zip -FSr ./terraform/nodejs.zip ./nodejs