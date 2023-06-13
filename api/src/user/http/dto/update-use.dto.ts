import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Max, MaxLength, ValidateIf } from 'class-validator';
import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile } from 'nestjs-form-data';

export class UpdateUserDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @ApiProperty()
    firstName: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(50)
    @ApiProperty()
    lastName: string;

    @IsString()
    @MaxLength(160)
    @ApiProperty()
    description: string;

    @ValidateIf((e) => e === null || e === undefined)
    @IsFile()
    @MaxFileSize(1e6)
    @HasMimeType(['image/jpeg', 'image/png', 'image/jpg'], {})
    avatar: MemoryStoredFile;

    @ValidateIf((e) => e === null || e === undefined)
    @IsFile()
    @MaxFileSize(1e6)
    @HasMimeType(['image/jpeg', 'image/png', 'image/jpg'])
    coverImage: MemoryStoredFile;
}
