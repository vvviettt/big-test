import { UserDocument, User } from '../schema/user.schema';
import { Injectable, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { PostRepository } from 'src/posts/repository/post.repository';
@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        @Inject(forwardRef(() => PostRepository)) private readonly postRepository: PostRepository
    ) {}

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
            throw new HttpException('Email đã được đăng ký ở một tài khoản khác', HttpStatus.CONFLICT);
        }
    }

    async getUserWithId(id: string | ObjectId) {
        const user = await this.userModel.findById(id);
        if (!user) {
            return {};
        }
        return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            avatarUrl: user.avatar,
            coverImageUrl: user.coverImage,
            following: user.following.length,
            followers: user.followers.length,
            description: user.description,
            dateOfBirth: user.dateOfBirth.getTime(),
            createdAt: (user.get('createdAt') as Date).getTime(),
            postCount: await this.postRepository.getNumberPostWithUserId(id)
        };
    }

    async updateInfo(
        id: string,
        firstName: string,
        lastName: string,
        description: string,
        avatar?: string,
        coverImage?: string
    ) {
        await this.userModel.updateOne(
            { _id: id },
            { firstName: firstName, lastName: lastName, description: description, avatar, coverImage },
            { $set: { avatar, coverImage } }
        );
        return { user: await this.getUserWithId(id) };
    }
}
