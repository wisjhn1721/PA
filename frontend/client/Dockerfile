FROM node:14

RUN mkdir -p /pa-client
WORKDIR /pa-client

COPY .yarnrc.yml /pa-client/
COPY .yarn/ /pa-client/.yarn/
COPY package.json yarn.lock /pa-client/
RUN yarn

COPY ./ /pa-client

EXPOSE 3000

CMD ["yarn", "start"]


