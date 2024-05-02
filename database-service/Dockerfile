FROM node:16
WORKDIR /app
COPY . .
COPY ./package.json /package.json
RUN npm install
CMD [ "npm" , "start:dev" ]