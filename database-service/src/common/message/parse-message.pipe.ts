import { Injectable, PipeTransform } from '@nestjs/common';
import { MessageDto } from './message.dto';

@Injectable()
export class ParseMessagePipe implements PipeTransform<any, MessageDto> {
  transform(rawMessage: any): MessageDto {
    const { value, headers } = rawMessage;
    return new MessageDto({ value, headers });
  }
}
