# setup steps

## Getting the Database ready
- First install postgres databse on your machine
- connect to the database with admin credintials 
``` 
psql -h localhost -U postgres
```
enter your password on the next prompet

### creat the reqired Database
for our application we will need 2 databases, one for the main application and the other for testing
```
CREATE DATABASE storeDB;
CREATE DATABASE storeDB_test;
```
### create API database user
this user will be used by node application to access the database and will be configured in the .env file
```
CREATE USER node_api_user WITH PASSWORD 'api_user_password';
```
assign this user a full access on the creates databases
```
\c storedb
GRANT ALL PRIVILEGES ON DATABASE storedb TO node_api_user;

\c storedb_test
GRANT ALL PRIVILEGES ON DATABASE storedb_test TO node_api_user;
```


## Starting the server

- insatall the application requird dependencies
```
npm install
```

- build the application 
```
npm run build
```