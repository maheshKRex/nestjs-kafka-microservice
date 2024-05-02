import { MessageDto } from "../message/message.dto";

export interface DecodedMessage {
    value: MessageDto['value'];
    headers: MessageDto['headers'];
  }