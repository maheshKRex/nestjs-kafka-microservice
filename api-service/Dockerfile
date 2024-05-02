FROM node:16
WORKDIR /app
COPY . .
COPY ./package.json /package.json
RUN npm install
EXPOSE 3001
CMD [ "npm" , "start:dev" ]