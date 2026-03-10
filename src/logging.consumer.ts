import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Log, LogDocument } from './log.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

interface LogEventData {
  message: string;
}

@Controller()
export class LoggingConsumer {
  constructor(@InjectModel(Log.name) private logModel: Model<LogDocument>) {}

  @EventPattern('log_event')
  async handleLog(data: LogEventData) {
    await this.logModel.create({ message: data.message, payload: data });
  }
}
