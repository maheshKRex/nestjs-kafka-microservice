import { Injectable, ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { MessageDto } from './message.dto';

@Injectable()
export class ParseMessagePipe implements PipeTransform<any, MessageDto> {
  transform(rawMessage: any, metadata: ArgumentMetadata): MessageDto {
    const { value, headers } = rawMessage;

    const parsedMessage = new MessageDto({ value, headers });

    return parsedMessage;
  }
}
