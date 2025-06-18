import { Module } from '@nestjs/common';
import { MessageModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from './message.schema';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MessageGateway } from './message.gateway';
import { Mongoose } from 'mongoose';

@Module({
  imports: [
    Mongoose.forFeature([{ name: Message.name, schema: MessageSchema }]),
  ],
  providers: [MessageGateway],
  controllers: [MessageController],
})
export class MessageModule {}
