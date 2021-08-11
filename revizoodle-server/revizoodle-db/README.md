# Test database

This directory provides a mySQL setup with demo data that can be used for development.

## Setup the database 
```
docker compose up
```

## Reset the database data
```
docker compose rm revizoodle-db
docker volume rm revizoodle-db_mysql-data
docker compose up
```

