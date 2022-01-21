#!/bin/bash

mode=$1
letsencrypt="/etc/letsencrypt"
cerbot_data="\
  --name platform-certbot \
  --network platform_nginx \
  -v platform_letsencrypt:$letsencrypt \
  --rm \
  certbot/certbot:v1.7.0"
certbot_cmd="\
  certonly \
    --email vanyauhalin@gmail.com \
    -w $letsencrypt \
    --agree-tos \
    --no-eff-email \
    --webroot"
domains=(
  "svg24.dev"
  "api.svg24.dev"
  "assets.svg24.dev"
  "board.svg24.dev"
  "www.svg24.dev")

get_root() {
  echo "$letsencrypt/live/$1"
}

get_cert() {
  echo "$letsencrypt/live/$1/cert.pem"
}

check_exist() {
  for domain in ${domains[*]}; do
    if [ -e "$(get_cert $domain)" ]; then
      echo "Error: certificate for $domain already exist"
      exit 1
    fi
  done
}

check_doesnt_exist() {
  for domain in ${domains[*]}; do
    if [ ! -e "$(get_cert $domain)" ]; then
      echo "Error: certificate for $domain doesn't exist"
      exit 1
    fi
  done
}

if [ $mode = "staging" ]; then
  check_exist

  for domain in ${domains[*]}; do
    root=$(get_root $domain)
    mkdir -p $root
    openssl req \
      -days 1 \
      -keyout "$root/privkey.pem" \
      -newkey rsa:1024 \
      -out "$root/fullchain.pem" \
      -subj "/CN=localhost" \
      -nodes \
      -x509
  done

  make rs-nginx

  for domain in ${domains[*]}; do
    rm -rf $(get_root $domain)
    docker run $cerbot_data $certbot_cmd -d $domain --staging
  done

  make rs-nginx
fi

if [ $mode = "force" ]; then
  check_doesnt_exist

  for domain in ${domains[*]}; do
    docker run $cerbot_data $certbot_cmd -d $domain --force-renewal
  done

  make rs-nginx
fi

if [ $mode = "renew" ]; then
  check_doesnt_exist
  docker run $cerbot_data renew --dry-run
  make rs-nginx
fi
