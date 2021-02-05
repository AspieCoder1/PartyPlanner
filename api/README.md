# API code

This is the directory where all the code for the API is stored. 
This service uses [TypeScript](https://www.typescriptlang.org/)
as the added static typing makes the code much more maintainable.

## How to run the service code
You may be asking how do I run the code for the backend service for testing purposes.
Fear not as it is very simple. All the code requires is for [Docker](https://www.docker.com/) to be installed.
You use the command line to move into the repository and then run docker compose. The following commands are entered,
```shell
> cd ./api
> docker-compose up --build
```
The `--build` ensures that the container images are rebuilt before the containers are created

## How to stop the code
Obviously if you have started the code you need to find away to close the code after you are finished.
To do this you run,
```shell
> docker-compose down
```
_Please note that when you close down the container all the contents of the database is wiped._