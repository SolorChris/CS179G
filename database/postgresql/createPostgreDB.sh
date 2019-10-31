#! /bin/bash
echo "creating db named CPC_DB"
folder=/tmp/CPC_DB
export PGDATA=$folder/data
export PGSOCKETS=$folder/sockets
export PGPORT=9001

/usr/lib/postgresql/11/bin/createdb -h localhost -p $PGPORT "CPC_DB"
/usr/lib/postgresql/11/bin/pg_ctl status

#echo "Copying csv files ... "
#sleep 1
#cp ../data/*.csv /tmp/$USER/myDB/data/.

echo "Initializing tables .. "
sleep 1
psql -h localhost -p $PGPORT "CPC_DB" < ../sql/create.sql