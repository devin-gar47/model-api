# ! /bin/bash

if [ -d "./nodejs" ] #check to see if directoy already exists
then
    rm -r nodejs
fi

mkdir nodejs
cp openapi.json ./terraform
cp package.json package-lock.json ./nodejs
cd ./nodejs && npm ci --production && cd ..
cp package.json package-lock.json openapi.json ./build
cd build && zip -r ../terraform/app.zip * && cd ..
zip -FSr ./terraform/nodejs.zip ./nodejs