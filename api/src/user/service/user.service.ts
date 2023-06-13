import { MediaStorageService } from 'src/mediaStorage/media_storage.service';
import { UpdateUserDto } from '../http/dto/update-use.dto';
import { UserRepository } from './../respository/user.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    constructor(private userRepo: UserRepository, private readonly mediaStorage: MediaStorageService) {}
    async getUserInformation(userId: string) {
        try {
            return { user: await this.userRepo.getUserWithId(userId), message: 'OK' };
        } catch (error) {
            throw new HttpException('Không tìm thấy thông tin.', HttpStatus.FORBIDDEN);
        }
    }

    async changeUserInformation(userId: string, data: UpdateUserDto) {
        try {
            let avatar: string;
            let coverImage: string;
            if (data.avatar) {
                const url = await this.mediaStorage.saveFiles([data.avatar]);
                if (url.length > 0) {
                    avatar = url[0];
                }

                // return { user: await this.userRepo.updateInfo(userId), message: 'OK' };
            }
            if (data.coverImage) {
                const url = await this.mediaStorage.saveFiles([data.coverImage]);
                if (url.length > 0) {
                    coverImage = url[0];
                }
            }
            return await this.userRepo.updateInfo(
                userId,
                data.firstName,
                data.lastName,
                data.description,
                avatar,
                coverImage
            );
        } catch (error) {
            throw new HttpException('Lỗi.', HttpStatus.FORBIDDEN);
        }
    }
}
