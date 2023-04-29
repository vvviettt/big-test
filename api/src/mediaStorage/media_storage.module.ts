/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MediaStorageService } from './media_storage.service';

@Module({
    imports: [],
    controllers: [],
    providers: [MediaStorageService]
})
export class MediaStorageModule {}
