FROM node:latest
WORKDIR /src/
COPY package*.json ./
RUN npm install

COPY . /src/
EXPOSE 3977
CMD [ "npm","start"]