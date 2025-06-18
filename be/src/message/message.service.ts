import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
  ) {}

  async create(message: Partial<Message>): Promise<Message> {
    const created = new this.messageModel(message);
    return created.save();
  }

  async fundByRoomId(roomId: string): Promise<Message[]> {
    return this.messageModel.find({ roomId }).sort({ timestamp: 1 }).exec();
  }
}
