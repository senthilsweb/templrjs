while IFS== read -r key value; do
  printf -v "$key" %s "$value" && export "$key"
done <.env

node .output/server/index.mjs