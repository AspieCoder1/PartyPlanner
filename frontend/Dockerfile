FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn
COPY ./ /app/
RUN yarn build

FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/build/ /etc/nginx/html/