import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageService } from './message/message.service';
import { MessageModule } from './message/message.module';

@Module({
  imports: [MessageModule],
  controllers: [AppController],
  providers: [AppService, MessageService],
})
export class AppModule {}
