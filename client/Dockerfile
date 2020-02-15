FROM node:alpine
WORKDIR /usr/src/app/client
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
CMD ["yarn", "start"]
