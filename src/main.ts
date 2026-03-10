import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const rabbitmqUrl = process.env.RABBITMQ_URL ?? 'amqp://localhost:5672';

  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [rabbitmqUrl],
      queue: 'logs_queue',
      queueOptions: {
        durable: true,
      },
    },
  });

  await app.listen();
}
void bootstrap();
