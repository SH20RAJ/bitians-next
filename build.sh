#!/bin/bash
echo "Installing dependencies with legacy-peer-deps..."
npm install --legacy-peer-deps
echo "Running pages:build..."
npx @cloudflare/next-on-pages
