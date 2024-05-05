export default (): any => ({
    clientId: 'kafkaSample',
    brokers: 'localhost:9092',
    groupId: 'my-kafka-consumer',
    getUserTopic: 'get_user',
    createUserTopic: 'create_user',
  })
  