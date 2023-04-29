import { UserRepository } from './../respository/user.repository';
/*
https://docs.nestjs.com/providers#services
*/

import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(private userRepo: UserRepository) {}
    async getUserInformation(userId: string) {
        try {
            return { user: await this.userRepo.getUserWithId(userId), message: 'OK' };
        } catch (error) {
            throw new HttpException('Không tìm thấy thông tin.', HttpStatus.FORBIDDEN);
        }
    }
}
