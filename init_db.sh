echo "Creating superuser"
psql -U postgres -c "CREATE USER superuser WITH PASSWORD '1234'";

echo "Creating database: perfectattendance"
psql -U postgres -c "CREATE DATABASE perfectattendance"


echo "Initializing database: perfectattendance"
psql -d perfectattendance -U postgres -f ./perfectattendance.sql
