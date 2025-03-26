#! /bin/bash

echo "--- copying private files ---"
mkdir -p ./ini/src/styles
cp ./src/styles/vars.css $_

mkdir -p ./ini/src/app
cp ./src/app/layout.tsx $_

mkdir -p ./ini/src/components
cp -R ./src/components/private  $_

mkdir -p ./ini/public
cp -R ./public/favicon.ico  $_

mkdir -p ./ini/public
cp -R ./public/marker.svg  $_

mkdir -p ./ini/public/assets
cp -R ./public/assets/logo.png  $_

echo "--- backup complete ---"