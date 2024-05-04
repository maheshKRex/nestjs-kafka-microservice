import { DecodedMessage } from "../types/DecodedMessage";

export class MessageDto {
  readonly value: string;
  readonly headers: any;

  constructor(partial: Partial<MessageDto>) {
    Object.assign(this, partial);
  }
}

export function decodeMessage(data: any): DecodedMessage {
  if (!data || !data.value) {
    throw new Error('Invalid message format');
  }

  const { value, headers } = data;

  return { value, headers };
}