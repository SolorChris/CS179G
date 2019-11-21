#! /bin/bash
echo "creating db named CPC_DB"
folder=/tmp/CPC
export PGDATA=$folder/data
export PGSOCKETS=$folder/sockets
export PGPORT=9001

PATH=/usr/lib/postgresql/11/bin:$PATH
export PATH

createdb -h localhost -p $PGPORT "CPC_DB"
pg_ctl status



echo "Copying csv files ... "
sleep 1
cp ../data/*.csv /tmp/CPC/data/.

echo "Initializing tables .. "
sleep 1
psql -h localhost -p $PGPORT "CPC_DB" < ../sql/create.sql
