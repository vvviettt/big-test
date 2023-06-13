import { IsNotEmpty, IsString } from 'class-validator';
import { LimitDTO } from './limit.dto';
import { ApiProperty } from '@nestjs/swagger';

export class GetCommentDTO extends LimitDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    postId: string;
}
