import { UserService } from './service/user.service';
import { UserController } from './http/controller/user.controller';
import { AuthService } from './service/auth.service';
import { env } from './../config/env.config';
import { User, UserSchema } from './schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { UserRepository } from './respository/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './http/controller/auth.controller';
import { PostModule } from 'src/posts/post.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { MediaStorageService } from 'src/mediaStorage/media_storage.service';

@Module({
    imports: [
        NestjsFormDataModule,
        forwardRef(() => PostModule),
        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema
            }
        ]),
        JwtModule.register({
            secret: env.JWT.JWT_SECRET,
            signOptions: {
                expiresIn: env.JWT.JWT_EXPIRE,
                algorithm: 'HS512'
            }
        })
    ],
    controllers: [UserController, AuthController],
    providers: [UserService, UserRepository, AuthService, MediaStorageService],
    exports: [UserRepository]
})
export class UserModule {}
