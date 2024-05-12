#!/bin/sh

echo "Starting configuration replacement..."

template_path="/etc/krakend/krakend.template.json"
output_path="/etc/krakend/krakend.json"

echo "Copying template to output path..."
cp $template_path $output_path

echo "Starting environment variable replacements..."
# Loop through all environment variables
env | while IFS='=' read -r name value; do
    # Use sed to safely replace each placeholder in the config file
    # This simple sed replacement avoids issues with special characters for now
    sed -i "s|\\\$${name}|${value}|g" $output_path
done

echo "Configuration replacement complete. Starting KrakenD..."
# Execute the original command
exec /usr/bin/krakend run -d -c $output_path
