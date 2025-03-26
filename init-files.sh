#! /bin/bash

echo "--- init private files ---"

mkdir -p ./src/styles
cp ./ini/src/styles/vars.css $_

mkdir -p ./src/app
cp ./ini/src/app/layout.tsx $_

mkdir -p ./src/components
cp -R ./ini/src/components/private  $_

mkdir -p ./public
cp -R ./ini/public/favicon.ico  $_

mkdir -p ./public
cp -R ./ini/public/marker.svg  $_

mkdir -p ./public/assets
cp -R ./ini/public/assets/logo.png  $_

echo "--- init/restore complete ---"