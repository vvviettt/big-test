import { PostService } from './service/post.service';
import { JwtService } from '@nestjs/jwt';
import { PostController } from './http/controller/post.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module, forwardRef } from '@nestjs/common';
import { MediaStorageService } from 'src/mediaStorage/media_storage.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schema/post.schema';
import { PostRepository } from './repository/post.repository';
import { UserModule } from 'src/user/user.module';
import { UserRepository } from 'src/user/respository/user.repository';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Post.name,
                schema: PostSchema
            }
        ]),
        UserModule
    ],
    controllers: [PostController],
    providers: [PostService, JwtService, MediaStorageService, PostRepository],
    exports: [PostRepository]
})
export class PostModule {}
