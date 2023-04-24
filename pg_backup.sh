#!/bin/bash
# Example of backup script for PostgreSQL
#    ./backup.sh -d /usr/dump  -h db.olnlsukvfdmjnrfxrhza.supabase.co -p 5432 -U postgres
# Example of backup
#   /usr/local/bin/pg_dump -v --format=c --compress=9 --file=/usr/dump/20230215_1434_postgres.backup --host=localhost --port=5432 --username=postgres --dbname=postgres
# Example of restore script for PostgreSQL
#    /usr/local/bin/pg_restore -v --no-owner --host=localhost --port=5432 --username=postgres --dbname=postgres /usr/dump/20230215_1434_postgres.backup
set -e
progName=$0

# Initialize variables
pgPath=/usr/local
db_name="zytes"

helpFunction()
{
cat <<EOF
 Usage: $progName  [OPTIONS]
 Options:
    -d <path> - path to directory where backup file to be placed
    -h - Postgres hostname
    -p - Postgres port number
    -U - Postgres user
EOF
  exit 0
}


if [ "$1" == '--help' ]; then
    helpFunction
    exit 0
fi


while getopts "d:h:p:U:?" opt
do
   case "$opt" in
      h) host_name="$OPTARG" ;;
      p) port_number="$OPTARG" ;;
      U) user_name="$OPTARG" ;;
      d) backup_path="$OPTARG";;
      ?) helpFunction ;; # Print helpFunction in case parameter is non-existent
   esac
done

if [[ "${host_name+x}" ]]; then
    host_param="--host=$host_name"
fi

if [[ "${port_number+x}" ]]; then
    port_param="--port=$port_number"
fi

user_param="--username=${user_name:-postgres}"

if [[ -z "$backup_path" ]]; then
	1>&2 echo "Path to backup directory has not been specified. Use option -d <path>"
	exit 1
fi

snapshot=$(date +"%Y%m%d_%H%M")

echo "Start backing up databases at $snapshot point of time..."


echo ${db_name}
backup_file=${backup_path}/${snapshot}_${db_name}.backup
#eval $pgPath/bin/pg_dump $host_param $port_param $user_param --format=c --compress=9 --file=$backup_file ${db_name}
echo $pgPath/bin/pg_dump $host_param $port_param $user_param --format=c --compress=9 --file=$backup_file ${db_name}


echo "...finish"



exit 0
