while IFS== read -r key value; do
  printf -v "$key" %s "$value" && export "$key"
done <.env

PORT=1337 node .output/server/index.mjs