#!/bin/bash
cd /workspaces/retrowave
rm -rf node_modules yarn.lock package-lock.json
npm install --legacy-peer-deps
npm run build
