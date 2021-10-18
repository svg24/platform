#!/bin/sh

mongoimport \
  --db $MONGO_DB \
  --collection logos \
  --file /srv/db/logos.json \
  --drop
