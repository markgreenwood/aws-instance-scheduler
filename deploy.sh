#!/usr/bin/env bash

rm -r node_modules && npm i --production
zip -r instance-scheduler.zip * -x .eslintrc .git .gitignore .prettier package.json package-lock.json deploy.sh
