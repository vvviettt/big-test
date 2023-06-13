import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class LimitDTO {
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @ApiProperty()
    limit: number;

    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    @ApiProperty()
    page: number;
}
