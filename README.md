# Microservices on NestJS communicating via Kafka and experimenting on Producer / Consumer idempotency

The repo consists of two branches:

#### main branch: 
The main task is to create two separate microservices that communicate via Kafka. One of these services exposes REST endpoints and produce messages to the Kafka broker. The other service consumes these messages and write them to an in-memory storage. Both services are maintained in a Monorepo.

#### idempotent-solution branch:
This branch has additional modules under each microservice trying to tackle idempotency at api-service(a.k.a producer) and database-service (a.k.a consumer) services.


## Run Locally

Assuming kafka broker is available at this address, as configured at ./api-service/src/config/configuration.ts

```bash
 brokers: 'localhost:9092'
```

start services locally
```bash
  git clone https://github.com/maheshKRex/nestjs-kafka-microservice.git
  cd nestjs-kafka-microservice
  cd api-service
  npm install
  npm run start:dev

  cd ../database-service
  npm install
  npm run start:dev
  
```

## Running Tests

To run tests, run the following command

```bash
  cd api-service
  npm run test:e2e
```

## Examples

POST /user
```bash
curl --location 'http://localhost:3001/users' \
--header 'Content-Type: application/json' \
--data '{
    "id":"1",
    "name": "test user 1"
}'
```

GET /user/1

```bash
curl --location 'http://localhost:3001/users/1'
```

```json
{
    "id": "1",
    "name": "test user 1"
}
```


## Idempotent consumer

### Approach

Added a way to track processed messages by a unique messageId. Each message needs to have a unique messageId assigned by the producing service, as a Kafka message header. When a new message is consumed the in-memory array is checked for the existence of this message Id. If present, then the message is a duplicate. The consumer updates its offsets to effectively mark the message as consumed to ensure it is not redelivered, and no further action takes place.

### Example

```bash
git checkout idempotent-solution
./api-service/npm run start:dev
./database-service/npm run start:dev
```
create user with messageId 1
POST /user
```bash
curl --location 'http://localhost:3001/users' \
--header 'Content-Type: application/json' \
--data '{
    "id":"1",
    "name": "test user 1"
}'
```

retry the by sending the same value as the messageId 1
POST /user
```bash
curl --location 'http://localhost:3001/users' \
--header 'Content-Type: application/json' \
--data '{
    "id":"1",
    "name": "test user 1"
}'
```

check consumer console for detection of the duplicate message and the consumer commits the offset to avoid further duplications by other consumers.


## Screenshots

https://ibb.co/GRbKXcZ


## Optimizations

More Optimizations can be done on idempotent consumer solution explored here. 
- For instance, the logic of storing processed messageId and actuallty processing a message can be made atomic using transactions. There by avoid chances of failing to mark a message as processed or marking a message as processed and crashing the consumer, without really processing the message.


generally on the whole project:
- can introduce Mono-repo management tools like nx comes with easy managemet tools: https://nx.dev/
- shared settings between producer and consumer such as kafka broker addresses, topics can be moved to a shared library, to avoid duplicate code, there by not having to update settings at both services.

