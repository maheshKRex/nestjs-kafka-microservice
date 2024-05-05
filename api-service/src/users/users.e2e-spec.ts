import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { Transport } from '@nestjs/microservices';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './users.e2e.configuration';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
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
          provide: 'KAFKA_SERVICE',
          useFactory: async (configService: ConfigService) => ({
            imports: [ConfigModule, ConfigService],
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: configService.get<string>('clientId'),
                brokers: [configService.get<string>('brokers')],
              },
              consumer: {
                groupId: configService.get<string>('groupId'),
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
  });

  it('should produce a message when POST request is made', async () => {
    
    const data = { id: '1', name: 'John Doe' };
    const producerService = app.get(UsersService);
    jest.spyOn(producerService, 'create');
    await request(app.getHttpServer())
      .post('/users')
      .send(data)
      .expect(201)

    expect(producerService.create).toHaveBeenCalledWith(data);
  });

  it('should retrieve data from Kafka when GET request is made', async () => {
    const producerService = app.get(UsersService);
    const data = { id: '1', name: 'John Doe' };
    jest.spyOn(producerService, 'get');

    const response = await request(app.getHttpServer())
    .get('/users/1')
    .abort
    expect(producerService.create).toHaveBeenCalledWith(data); 
  });
});
