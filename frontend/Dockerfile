FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn
COPY ./ /app/
# ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
# ENV REACT_APP_CHAT_URL=$REACT_APP_CHAT_URL
RUN yarn build

FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/build/ /etc/nginx/html/