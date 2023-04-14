import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ConfirmDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    code: string;
}
