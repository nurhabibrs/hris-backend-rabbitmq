import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class LoggingConsumer {
  @EventPattern('log_event')
  handleLog(data: any) {
    console.log('Log received:', data);
  }
}
