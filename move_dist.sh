#!/bin/bash

# If the 'dist' directory exists in the root, delete its contents.
if [ -d "./dist" ]; then
    rm -rf "./dist"/*
fi

# Copy the contents from 'web/dist' to the root 'dist' directory
cp -r "./web/dist/"* "./dist/"

echo "Operation completed!"
