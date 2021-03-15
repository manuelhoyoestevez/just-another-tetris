FROM node:10.15.3-jessie

LABEL maintainer="Manuel Hoyo Estévez <manuelhoyoestevez@gmail.com>"

# Prepare app directory
RUN mkdir -p /usr/src/app
ADD . /usr/src/app
WORKDIR /usr/src/app

# Install
RUN npm install

# Build
RUN npm run build:dev
RUN npm run build:prod

# Run
CMD bash -c "npm install && npm start"
