import { Transform } from 'class-transformer';
import { IsArray, IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, ValidateIf } from 'class-validator';
import { log } from 'console';

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

    @ValidateIf((object, value) => {
        return value !== undefined;
    })
    @IsString()
    surveyTitle: string | undefined;

    @Transform(({ value }) => {
        log(value);
        return Number.parseInt(value ?? 0);
    })
    @Min(0)
    @Max(2)
    @IsNumber()
    mode: number;
}
