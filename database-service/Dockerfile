FROM node:16
WORKDIR /app
COPY . .
COPY ./package.json /app/package.json
RUN npm install
CMD ["npm", "run", "start:dev"]