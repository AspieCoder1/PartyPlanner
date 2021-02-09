FROM node:lts-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

FROM node:lts-alpine
WORKDIR /app
COPY --from=builder  ./app/dist/ .
COPY package.json yarn.lock ./
RUN yarn install --production
CMD yarn start