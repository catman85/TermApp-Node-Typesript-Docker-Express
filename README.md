## dev
npm install
npm run start:dev

## docker
docker build -t "docker-medium" .
docker run --rm docker-medium node build/boot.js
