import { AuthService } from './../../service/auth.service';
import { SignInDto } from './../dto/signin.dto';
import { Body, Controller, HttpCode, HttpStatus, Post, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from '../dto/signup.dto';
import { ConfirmDto } from '../dto/confirm.dto';
import { ExtractJwt } from 'passport-jwt';

@ApiTags('Authentication')
@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/sign-in')
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({ description: 'Sign In success' })
    async signIn(@Body() data: SignInDto) {
        return this.authService.signInService(data.email, data.password, data.rememberMe);
    }

    @Post('/sign-up')
    async signUp(@Body() { dateOfBirth, fistName, lastName, email, password }: SignUpDto) {
        return await this.authService.signUpService(email, password, fistName, lastName, dateOfBirth);
    }

    @Post('/confirm-signup')
    @ApiBearerAuth()
    async confirmSignUp(@Body() { code }: ConfirmDto, @Request() request) {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        return await this.authService.confirmSignupService(code, token);
    }
}
