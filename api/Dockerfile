FROM node:lts-alpine
WORKDIR /app
COPY ./src .
COPY package.json yarn.lock ./
RUN yarn install --production
CMD yarn start