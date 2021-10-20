#!/bin/sh

cd /srv/db

for cl in $(find . -maxdepth 1 ! -path . -type d | sed 's/^\.\///g' | sort); do
  mongoimport \
    --host db \
    --authenticationDatabase admin \
    --username $DB_USER \
    --password $DB_PASS \
    --db $DB_NAME \
    --collection $cl \
    --file $cl/$cl.json \
    --drop;
done
