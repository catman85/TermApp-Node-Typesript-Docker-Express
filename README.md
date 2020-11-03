
# A web-based terminal app for showing covid-19 status

[![GitHub stars](https://img.shields.io/github/stars/catman85/TermApp-Node-Typesript-Docker-Express?style=for-the-badge)](https://github.com/catman85/TermApp-Node-Typesript-Docker-Express/stargazers) [![GitHub forks](https://img.shields.io/github/forks/catman85/TermApp-Node-Typesript-Docker-Express?style=for-the-badge)](https://github.com/catman85/TermApp-Node-Typesript-Docker-Express/network) 
![ ](https://i.imgur.com/OxklHiU.png)

# 💉 It's sick  😷 [![HitCount](http://hits.dwyl.com/catman85/TermApp-Node-Typesript-Docker-Express.svg)](http://hits.dwyl.com/catman85/TermApp-Node-Typesript-Docker-Express) 

# Try it out 😎

```sh

curl http://snf-878293.vm.okeanos.grnet.gr/

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

```sh
npm ci
npm run start:dev
```

## Develop with docker

##### The following command triggers the Dockerfile in the current dir and only reaches the dev stage not the prod

```sh
docker-compose up
```

  

##### Execution path:

1. docker-compose up

1. Dockerfile

1. npm ci --quiet && npm run build

1. npm run start:dev

1. nodemon (looks for changes in src and hot reloads)

1. ts-node -> static analysis and debugging

 
## Docker in production

```sh
docker build -t "docker-app"  .
docker run -d -p 80:8080 --rm docker-app node build/boot.js
```
