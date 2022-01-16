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

## update the Enviroment variables files
a sample of required .env file is available you need to add all the parameters to run the application successfully 
- 2 files will be created ".env" & ".env_test"
- .env      -> will be loaded for the development server
- .env_test -> will be loaded while testing and contain the testing database

## Starting the server

- install the application requird dependencies
```
npm install
```

- build the application 
```
npm run build
```
- run the Dev server
```
npm run serve
```
- run the productin server
```
node /dist/server.js
```

## Testing the Application APIs

An automated Spec testing is provided to run and execute all required tests
```
npm run test
```

### Manual testing
A Postman collection is available with all configured API routes and the required inputs

#### Create a user
you must create a user and login to get the API tokken and use it with the Other APIs

- all collection is configured to use the tokken from the main collection Authorization

## Application Specs
### ports
- Node Application run on port : 8000
- Database run on the default port: 5432