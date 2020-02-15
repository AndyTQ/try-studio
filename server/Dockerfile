FROM node:alpine
WORKDIR /usr/src/app/server
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
CMD ["yarn", "dev"]
