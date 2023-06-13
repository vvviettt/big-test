import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CustomMessagePipe implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata) {
        const object = plainToClass(metadata.metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            const message = errors[0].constraints[Object.keys(errors[0].constraints)[0]];
            throw new BadRequestException(message);
        }

        return value;
    }
}
