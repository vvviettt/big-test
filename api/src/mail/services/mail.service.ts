import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) {}

    async sendUserConfirmCode(email: string, code: string) {
        this.mailerService.sendMail({
            to: email, // list of receivers
            subject: 'Register social media app',
            template: './signup-confirm',
            from: 'vvviet.it@gmail.com',
            context: {
                code: code
            }
        });
    }
}
