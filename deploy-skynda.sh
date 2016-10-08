#!/usr/bin/env bash
git fetch -p
git pull
npm i
npm run deploy:prod
