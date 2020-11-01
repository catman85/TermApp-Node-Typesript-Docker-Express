# Builder stage.
# This state compile our TypeScript to get the JavaScript code
FROM node:12.13.0 AS dev

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src
EXPOSE 8080

# ci stands for clean install
# it removes node_modules/ and looks in package-lock.json
# for strict versioning
RUN npm ci --quiet && npm run build

# Production stage.
# This state compile get back the JavaScript code from builder stage
# It will also install the production package only
# we use alpine flavour because it's lightweight
FROM node:12.13.0-alpine AS prod

WORKDIR /app

# now npm install will not install devDependencies
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --quiet --only=production

## We just need the build to execute the command
COPY --from=dev /usr/src/app/build ./build
