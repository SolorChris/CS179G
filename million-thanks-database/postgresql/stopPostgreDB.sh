#! /bin/bash
folder=/tmp/CPC_DB
export PGDATA=$folder/data
export PGSOCKETS=$folder/sockets
export PGPORT=9001
/usr/lib/postgresql/11/bin/pg_ctl -o "-c unix_socket_directories=$PGSOCKETS -p $PGPORT" -D $PGDATA -l $folder/logfile stop
