FROM node:10.15.3-jessie

MAINTAINER MANUELHOYOESTEVEZ

RUN echo "alias egrep='egrep --color=auto'" >> /root/.bashrc
RUN echo "alias fgrep='fgrep --color=auto'" >> /root/.bashrc
RUN echo "alias grep='grep --color=auto'" >> /root/.bashrc
RUN echo "alias l='ls -CF'" >> /root/.bashrc
RUN echo "alias la='ls -A'" >> /root/.bashrc
RUN echo "alias ll='ls -alF'" >> /root/.bashrc
RUN echo "alias ls='ls --color=auto'" >> /root/.bashrc

# Prepare app directory
RUN mkdir -p /usr/src/app
ADD . /usr/src/app
WORKDIR /usr/src/app

# Install
RUN npm install

# Build
RUN npm run build:dev

# Expose port
EXPOSE 8080

# Run
CMD [ "npm", "start" ]
