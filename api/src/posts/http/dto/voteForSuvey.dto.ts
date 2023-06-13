import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class VoteForSuveyDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    postId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    index: number;
}
