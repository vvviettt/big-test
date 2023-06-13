import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CommentDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    content: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    postId: string;
}
