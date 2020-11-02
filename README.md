# A web-based terminal app for showing covid-19 status
### Made with ❤️:
- NodeJS
- TypeScript
- Docker
- ExpressJS

## Try it out
```sh
curl http://snf-878293.vm.okeanos.grnet.gr:1234/
```
#### The visitor is geolocated and data is shown for his country.

## Develop locally
```sh
npm ci
npm run start:dev
```

## Develop with docker
##### The following command triggers the Dockerfile in the current dir and only reaches the dev stage not the prod
```sh
docker-compose up
```

## Execution path:
1. docker-compose up
1. Dockerfile 
1. npm ci --quiet && npm run build
1. npm run start:dev
1. nodemon (looks for changes in src and hot reloads)
1. ts-node -> static analysis and debugging

## Docker in production
```sh
docker build -t "docker-app" .
docker run -d -p 1234:8080 --rm docker-app  node build/boot.js
```
