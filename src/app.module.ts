import { Module } from '@nestjs/common';
import { LoggingConsumer } from './logging.consumer';

@Module({
  controllers: [LoggingConsumer],
})
export class AppModule {}
