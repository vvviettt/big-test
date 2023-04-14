import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @Transform((value) => (typeof value === 'boolean' ? value : false))
  @ApiProperty()
  @IsBoolean()
  rememberMe: boolean;
}
