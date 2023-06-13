import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetMyPostDto {
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @ApiProperty({ required: false })
    @IsOptional()
    limit?: number = 10;
    @Transform((a) => {
        return a.value ?? 10;
    })
    @Transform(({ value }) => parseInt(value))
    @IsNumber()
    @ApiProperty({ required: false })
    @IsOptional()
    page?: number = 1;
}
