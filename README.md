# REST API made using nodejs with express

Simple APi Rest using express with sequelizer

## How to run the project

first install dependencies using npm install

Setup env
copi .env.example to .env and edit file
Exaple .env configuration
NODE_ENV="development"
TAG=13
DIALECT="postgres"
PORT=300
DB_NAME="store"
DB_USER="admin"
DB_PASSWORD="admin"
DB_HOST="localhost"
DB_PORT="5432"
URI=""
JWTSECRET="mwJyftGWUOk8ECPBhjDI3lro1b64LgT5"

- The URI env variable can be used to overwhite the conection string URI for productio enviroments

- The TAG is used if you want to use docker to run a container for the database

## Runing database container

You can run a container database using the provided docker-compose.yml

This file use the .env file to obtain the tag and credentials to create the user to conect to the container

if you want to run other container diferent to postgress you have to configure the docker-compose.ym file yourself
