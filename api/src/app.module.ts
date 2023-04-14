import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';
import { env } from './config/env.config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GlobalCacheModule } from './config/cache.config';

const environment = process.env.NODE_ENV || 'development';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${environment}`,
            isGlobal: true
        }),
        MongooseModule.forRoot(`mongodb://localhost:${env.DATABASE.DATABASE_PORT}/${env.DATABASE.DATABASE_NAME}`, {
            ignoreUndefined: true
        }),
        GlobalCacheModule,
        MailModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
