#! /bin/bash
folder=/tmp/CPC
export PGDATA=$folder/data
export PGSOCKETS=$folder/sockets

echo $folder

#Clear folder
rm -rf $folder

#Initialize folders
mkdir $folder
mkdir $folder
mkdir $folder/data
mkdir $folder/sockets
sleep 1
#cp ../data/*.csv $folder/myDB/data

#Initialize DB
/usr/lib/postgresql/11/bin/initdb

sleep 1
#Start folder
export PGPORT=9001
/usr/lib/postgresql/11/bin/pg_ctl -o "-c unix_socket_directories=$PGSOCKETS -p $PGPORT" -D $PGDATA -l $folder/logfile start

