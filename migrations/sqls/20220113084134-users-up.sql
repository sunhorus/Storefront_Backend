CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    username VARCHAR(20),
    firstName VARCHAR(25), 
    lastName VARCHAR(25), 
    password_digest VARCHAR(100)
);