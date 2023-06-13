import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class OnlyIdDTO {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    id: string;
}
