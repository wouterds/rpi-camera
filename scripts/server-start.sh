#!/bin/bash

sudo -u pi -S sudo npm start $(dirname $0)/server.js > /dev/null 2>&1 &
