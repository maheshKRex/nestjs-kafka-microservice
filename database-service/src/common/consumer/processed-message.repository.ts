import { Injectable } from "@nestjs/common";
import { ProcessedMessage } from "../message/ProcessedMessage";

@Injectable()
export class ProcessedMessageRepository {
    private readonly messages: ProcessedMessage[] = [];

  save(message: ProcessedMessage) {
    this.messages.push({ ...message, id: message.id });
    console.log(this.messages);
  }

  findOne(id: string) {
    return this.messages.find((m) => m.id === id) || null;
  }
}