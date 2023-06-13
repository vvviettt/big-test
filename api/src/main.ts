import { env } from './config/env.config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ValidateException } from './core/validate/validate.exception';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            stopAtFirstError: true,
            exceptionFactory: (errors) => new ValidateException(errors)
        })
    );
    app.enableCors({
        origin: (requestOrigin, callback) => {
            if (!requestOrigin) {
                return callback(null, true);
            }
            requestOrigin = requestOrigin.replace('https://', '').replace('http://', '');
            return callback(null, true);
            // if (env.WHITELIST_DOMAINS.indexOf(requestOrigin) !== -1) {
            // } else {
            //     return callback(new BadRequestException(`No CORS allowed. Origin: ${requestOrigin}`), false);
            // }
        }
    });
    const config = new DocumentBuilder()
        .setTitle('Api')
        .setDescription('Media app api')
        .setVersion('1.0')
        .addTag('api')
        .setBasePath('/api')
        .addBearerAuth({ type: 'http' })
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(env.APP_PORT);
}
bootstrap();
