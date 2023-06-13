import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, Max, MaxLength, Min, ValidateIf } from 'class-validator';

export class NewPostDto {
    @IsNotEmpty()
    @MaxLength(500)
    content: string;

    @Transform(({ value }) => {
        if (typeof value === 'string') {
            return value.split(',');
        }
        return value;
    })
    @IsArray()
    @ValidateIf((object, value) => value !== undefined)
    surveyOption: string[] | undefined;
    @Transform(({ value }) => {
        return parseInt(value);
    })
    @IsNumber()
    surveyTime: number;

    @Transform(({ value }) => {
        return Number.parseInt(value ?? 0);
    })
    @Min(0)
    @Max(2)
    @IsNumber()
    mode: number;
}
