FROM node:16
WORKDIR /app
COPY . .
COPY ./package.json /app/package.json
RUN npm install
EXPOSE 3001
CMD ["npm", "run", "start:dev"]