import { IsDate, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Password } from '../validate/password.validate';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
export class SignUpDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    fistName: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    @IsNotEmpty()
    @ApiProperty()
    @Password()
    password: string;

    @Type(() => Date)
    @IsDate()
    @ApiProperty()
    dateOfBirth: Date;
}
