import { MailService } from './../../mail/services/mail.service';
import { env } from './../../config/env.config';
import { UserRepository } from '../respository/user.repository';
import * as bcrypt from 'bcrypt';
import { CACHE_MANAGER, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { JwtService } from '@nestjs/jwt';
import { NewUserInCache } from '../interfaces/new-user-in-cache.interface';
import { log } from 'console';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: UserRepository,
        @Inject(CACHE_MANAGER) private cache: Cache,
        private jwtService: JwtService,
        private mailService: MailService
    ) {}

    async signInService(email: string, password: string, rememberMe: boolean) {
        const user = await this.authRepository.getUsersWithEmail(email);
        console.log(user);
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                //Generate token
                const jwtAccessToken = await this.jwtService.sign(
                    { id: user._id, email: user.email, firstName: user.firstName, lastName: user.lastName },
                    {
                        secret: env.JWT.JWT_SECRET,
                        expiresIn: rememberMe ? env.JWT.JWT_EXPIRE_REMEMBER : env.JWT.JWT_EXPIRE
                    }
                );
                return {
                    status: 1,
                    message: 'Đăng nhập thành công.',
                    accessToken: jwtAccessToken
                };
            }
            throw new HttpException('Email hoặc mật khẩu không chính xác.', HttpStatus.UNAUTHORIZED);
        }
        throw new HttpException('Email hoặc mật khẩu không chính xác.', HttpStatus.UNAUTHORIZED);
    }
    async signUpService(email: string, password: string, firstName: string, lastName: string, dateOfBirth: Date) {
        await this.authRepository.isEmailUnique(email);
        //Generate code to sign up
        const code = (Math.floor(Math.random() * 90000) + 10000).toString();
        //Generate token
        const jwtSignUp = await this.jwtService.sign(
            {},
            { secret: env.JWT.JWT_SIGN_UP_SECRET, expiresIn: env.JWT.JWT_SIGN_UP_EXPIRE }
        );
        //Save data to  cache
        this.cache.set(jwtSignUp, { code, email, firstName, lastName, dateOfBirth, password }, 60000);
        //Send code to user
        this.mailService.sendUserConfirmCode(email, code.toString());
        return {
            status: 1,
            message: 'Mã xác nhận đã được gửi về email của bạn.',
            token: jwtSignUp
        };
    }

    async confirmSignupService(userCode: string, token: string) {
        const user = await this.cache.get<NewUserInCache>(token);
        if (user) {
            const { code, firstName, lastName, email, password, dateOfBirth } = user;
            if (code === userCode) {
                const hashedPassword = await bcrypt.hash(password, env.SALT_ROUND);
                this.authRepository.saveNewUser(email, firstName, lastName, hashedPassword, dateOfBirth);
                return {
                    message: 'Đăng ký thành công.'
                };
            } else {
                throw new HttpException('Mã xác nhận không chính xác', HttpStatus.BAD_REQUEST);
            }
        }
        throw new HttpException('Không có quyền truy cập', HttpStatus.UNAUTHORIZED);
    }
}
