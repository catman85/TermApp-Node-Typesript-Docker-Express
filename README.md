## dev
npm install
npm run start:dev

## dev with docker
# The following command triggers the Dockerfile in the current dir
docker-compose up

## docker in production
docker build -t "docker-app" .
docker run --rm docker-app node build/boot.js

docker-compose up -> Dockerfile -> npm run start:dev -> nodemon (looks for changes in src and hot reloads) -> ts-node -> static analysis and debugging
