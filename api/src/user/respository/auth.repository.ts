import { ValidateException } from './../../core/validate/validate.exception';
import { UserDocument, User } from './../schema/user.schema';
import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
@Injectable()
export class AuthRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async getUsersWithEmail(email: string) {
        return await this.userModel.findOne({ email });
    }

    async saveNewUser(email: string, firstName: string, lastName: string, password: string, dateOfBirth: Date) {
        return await new this.userModel({ email, firstName, lastName, password, dateOfBirth }).save();
    }

    async isEmailUnique(email: string) {
        const user = await this.getUsersWithEmail(email);
        if (!user) return;
        else {
            throw new HttpException('Email đã được đăng ký ở một tài khoản khác.', HttpStatus.CONFLICT);
        }
    }
}
