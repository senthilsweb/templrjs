while IFS== read -r key value || [[ -n "$key" ]]; do
  printf -v "$key" %s "$value" && export "$key"
done < .env

PORT=3000 node .output/server/index.mjs
