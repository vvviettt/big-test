import { PostService } from './service/post.service';
import { JwtService } from '@nestjs/jwt';
import { PostController } from './http/controller/post.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { MediaStorageService } from 'src/mediaStorage/media_storage.service';
import { PostRepository } from './respository/post.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schema/post.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Post.name,
                schema: PostSchema
            }
        ])
    ],
    controllers: [PostController],
    providers: [PostService, JwtService, MediaStorageService, PostRepository]
})
export class PostModule {}
