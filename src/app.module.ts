import { Module } from '@nestjs/common';
import { LoggingConsumer } from './logging.consumer';
import { MongooseModule } from '@nestjs/mongoose';
import { Log, LogSchema } from './log.schema';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI ?? 'mongodb://localhost:27017/hris',
    ),
    MongooseModule.forFeature([{ name: Log.name, schema: LogSchema }]),
  ],
  controllers: [LoggingConsumer],
})
export class AppModule {}
