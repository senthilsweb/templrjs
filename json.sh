#!/bin/bash

# Set the directory containing the screenshots
screenshot_dir="/Users/skaruppaiah1/Downloads/SSPL-Mobile-UI-BP"

# Initialize an empty array for JSON
json_array=()

# Loop through the JPG files in the directory
for file in "$screenshot_dir"/*.jpg; do
    filename=$(basename "$file")
    name="${filename%.*}"  # Remove the file extension
    name="$(tr '[:lower:]' '[:upper:]' <<< ${name:0:1})${name:1}"  # Capitalize first letter
    
    
   json_entry='{
      "name": "'"$name"'",
      "current": false,
      "description": "",
      "href": "https://res.cloudinary.com/nathansweb/image/upload/v1693278217/blackpond/'"$filename"'"
    }'
    
    json_array+=("$json_entry")
done

# Convert the array to JSON format and write to file
echo "[${json_array[@]}" > screenshots.json
