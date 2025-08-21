
# A web-based terminal app for showing covid-19 status

[![GitHub stars](https://img.shields.io/github/stars/catman85/TermApp-Node-Typesript-Docker-Express?style=for-the-badge)](https://github.com/catman85/TermApp-Node-Typesript-Docker-Express/stargazers) [![GitHub forks](https://img.shields.io/github/forks/catman85/TermApp-Node-Typesript-Docker-Express?style=for-the-badge)](https://github.com/catman85/TermApp-Node-Typesript-Docker-Express/network) 
![ ](https://i.imgur.com/OxklHiU.png)

# 💉 It's sick 😷 Featured in [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/chubin/awesome-console-services)
# Try it out 😎

```sh

curl snf-878293.vm.okeanos.grnet.gr

```

![  ](https://i.imgur.com/VKI04BA.png)
#### The visitor is geolocated and data is shown for his country.

### Made with ❤️:

- NodeJS
[![forthebadge](https://forthebadge.com/images/badges/as-seen-on-tv.svg)](https://forthebadge.com)
- TypeScript
[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)
- Docker
[![forthebadge](https://forthebadge.com/images/badges/works-on-my-machine.svg)](https://forthebadge.com)
- ExpressJS
 [![forthebadge](https://forthebadge.com/images/badges/powered-by-black-magic.svg)](https://forthebadge.com)
  

## Develop locally

1. modify the .env file and add your https://api-ninjas.com/api/covid19 api key
```sh
nano .env
SERVER_PORT=8080
HOST_PORT=1234
NINJA_API_KEY=YOUR_KEY
```

```sh
npm ci
npm run start:dev
```

## Develop with docker

```sh
docker-compose up
```

### Execution sequence:

1. docker-compose up

1. Dockerfile

1. npm ci --quiet && npm run build

1. npm run start:dev

1. nodemon (when it detects changes->)

1. ts-node 

1. boot.ts

 
## Docker in production

```sh
docker build -t "docker-app"  .
docker run -d -p 80:8080 --rm docker-app node build/boot.js
```
