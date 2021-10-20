#!/bin/sh

for cl in $(find . -type d -maxdepth 1 | sed 's/^\.\///g' | sort); do
  mongoimport \
    --db $MONGO_DB \
    --collection $cl \
    --file /srv/db/$cl/$cl.json \
    --drop;
done
