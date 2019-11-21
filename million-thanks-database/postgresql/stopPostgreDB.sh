#! /bin/bash
folder=/tmp/CPC
export PGDATA=$folder/data
export PGSOCKETS=$folder/sockets
export PGPORT=9001

PATH=/usr/lib/postgresql/11/bin:$PATH
export PATH

psql -h localhost -p $PGPORT "CPC_DB" -c "\copy Customers to '../data/Customers.csv' csv"
psql -h localhost -p $PGPORT "CPC_DB" -c "\copy Letters to '../data/Letters.csv' csv"
pg_ctl -o "-c unix_socket_directories=$PGSOCKETS -p $PGPORT" -D $PGDATA -l $folder/logfile stop

