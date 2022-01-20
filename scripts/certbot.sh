#!/bin/bash

mode=$1
cerbot_data="\
  --name platform-certbot \
	--network platform_nginx \
	-v certbot:/var/www/html \
	-v letsencrypt:/etc/letsencrypt \
	--rm \
	certbot/certbot:v1.7.0"
certbot_cmd="\
  certonly \
    --email vanyauhalin@gmail.com \
    --webroot-path /var/www/html \
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
  echo "/etc/letsencrypt/live/$1"
}

get_cert() {
  echo "/etc/letsencrypt/live/$1/cert.pem"
}

if [ $mode = "staging" ]; then
  # Dummy certificates
  for domain in ${domains[*]}; do
    if [ ! -e "$(get_cert $domain)" ]; then
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
    fi
  done

  make rs-nginx

  # Real certificates
  for domain in ${domains[*]}; do
    if [ ! -e "$(get_cert $domain)" ]; then
      rm -rf $(get_root $domain)
      docker run $cerbot_data $certbot_cmd -d $domain --staging
    fi
  done
fi

if [ $mode = "force" ]; then
  for domain in ${domains[*]}; do
    if [ -e "$(get_cert $domain)" ]; then
      docker run $cerbot_data $certbot_cmd -d $domain --force-renewal
    fi
  done
fi
