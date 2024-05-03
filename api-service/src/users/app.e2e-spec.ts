import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { StartedTestContainer } from 'testcontainers';
import { kafkaSetup } from "../../test/kafka.setup";
import { Transport } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './app.e2e.configuration';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  let kafkaContainers: StartedTestContainer[];

  beforeAll(async () => {
    kafkaContainers = await kafkaSetup();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration]
        }),
      ],
      controllers: [],
      providers: [
        {
          provide: 'DATABASE_SERVICE',
          useFactory: async (configService: ConfigService) => ({
            imports: [ConfigModule, ConfigService],
            transport: Transport.KAFKA,
            options: {
              client: {
                  clientId: 'kafkaSample',
                  brokers: ['localhost:9092'],
              },
              consumer: {
                  groupId: 'my-kafka-consumer',
              },
            },
        }),
        inject: [ConfigService],
        }
      ]
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    for (const container of kafkaContainers) {
      await container.stop();
    }
  });

  it('should produce a message when POST request is made', async () => {
    
    const data = { id: '1', name: 'John Doe' }; // Example data
    const producerService = app.get(UsersService); // Inject producer service
    jest.spyOn(producerService, 'create'); // Spy on producer service method
    await request(app.getHttpServer())
      .post('/users')
      .send(data)
      .expect(201)

    expect(producerService.create).toHaveBeenCalledWith(data); // Assert message production
  });

  it('should retrieve data from Kafka when GET request is made', async () => {
    const producerService = app.get(UsersService); // Inject producer service
    const id = 1; // Example data
    const data = { id: '1', name: 'John Doe' }; // Example data
    jest.spyOn(producerService, 'get'); // Spy on producer service method

    const response = await request(app.getHttpServer())
    .get('/users/5')
    .abort
    expect(producerService.create).toHaveBeenCalledWith(data); 
  });
});
