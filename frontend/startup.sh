#!/bin/bash
# Serve React SPA with SPA fallback
cd /home/site/wwwroot
npx serve -s . -l $PORT
