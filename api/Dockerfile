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
ENV PORT=5000
EXPOSE 5000
CMD yarn start