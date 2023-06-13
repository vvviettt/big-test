import { SurveyOption } from '../interfaces/SurveyOption';
import { HttpCode, HttpException, HttpStatus, Inject, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, ObjectId } from 'mongoose';

import { Post, PostDocument } from 'src/posts/schema/post.schema';
import { UserRepository } from 'src/user/respository/user.repository';

export class PostRepository {
    constructor(
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
        @Inject(forwardRef(() => UserRepository)) private readonly userRepository: UserRepository
    ) {}

    async saveNewPost(
        content: string,
        images: string[],
        surveyOptions: SurveyOption[],
        surveyTime: number,
        mode: number,
        ownerId: string
    ) {
        return await new this.postModel({
            content,
            images,
            surveyOptions,
            surveyTime,
            mode,
            ownerId
        }).save();
    }

    async getNumberPostWithUserId(userId: string | ObjectId) {
        return await this.postModel.count({ ownerId: userId });
    }

    async getPostWithId(id: string, limit: number, page: number) {
        const res = await this.postModel
            .find({ ownerId: id })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip((page - 1) * limit);

        const fc = async (post) => {
            return {
                id: post.id,
                owner: await this.userRepository.getUserWithId(post.ownerId),
                content: post.content,
                images: post.images,
                survey: post.surveyOptions,
                surveyTime: post.surveyTime,
                likes: post.like,
                comments: [],
                commentTotal: post.comments.length,
                createdAt: (post.get('createdAt') as Date).getTime(),
                updatedAt: (post.get('updatedAt') as Date).getTime()
            };
        };

        const posts = await Promise.all(res.map(async (post) => fc(post)));
        return { posts: posts, total: await this.postModel.count({ ownerId: id }) };
    }

    async voteForSuvey(postId: string, index: number, userId: string) {
        try {
            const post = await this.postModel.findById(postId);
            if (post.surveyOptions[index].vote.includes(userId as unknown as ObjectId)) {
                return { message: 'Suceess' };
            }
            const update = post.surveyOptions.map((suvey, i) => {
                if (i === index) {
                    return {
                        ...suvey,
                        vote: [...suvey.vote, userId]
                    };
                } else {
                    const newVote = suvey.vote.filter((item) => {
                        return (item as unknown) !== userId;
                    });
                    return {
                        ...suvey,
                        vote: newVote
                    };
                }
            });
            await this.postModel.updateOne({ _id: postId }, { surveyOptions: update });
            const newPost = await this.postModel.findById(postId);
            return {
                id: newPost.id,
                owner: await this.userRepository.getUserWithId(newPost.ownerId),
                content: newPost.content,
                images: newPost.images,
                survey: newPost.surveyOptions,
                surveyTime: newPost.surveyTime,
                likes: newPost.like,
                comments: [],
                commentTotal: newPost.comments.length,
                createdAt: (newPost.get('createdAt') as Date).getTime(),
                updatedAt: (newPost.get('updatedAt') as Date).getTime()
            };
        } catch (error) {
            throw new HttpException('Lỗi dữ liệu.', HttpStatus.BAD_REQUEST);
        }
        // this.postModel.updateOne()
    }

    async lovePost(postId: string, userId: string) {
        const post = await this.postModel.findById(postId);
        let update = [];
        if (post.like.includes(userId as unknown as ObjectId)) {
            update = post.like.filter((val) => val !== (userId as unknown as ObjectId));
        } else {
            update = [...post.like, userId];
        }
        await this.postModel.updateOne({ _id: postId }, { like: update });
        const newPost = await this.postModel.findById(postId);
        return {
            id: newPost.id,
            owner: await this.userRepository.getUserWithId(newPost.ownerId),
            content: newPost.content,
            images: newPost.images,
            survey: newPost.surveyOptions,
            surveyTime: newPost.surveyTime,
            likes: newPost.like,
            comments: [],
            commentTotal: newPost.comments.length,
            createdAt: (newPost.get('createdAt') as Date).getTime(),
            updatedAt: (newPost.get('updatedAt') as Date).getTime()
        };
    }

    async getComments(postId: string, limit?: number, page?: number) {
        const post = await this.postModel.findById(postId);
        const a = await Promise.all(
            post.comments.slice(limit * (page - 1), limit * page).map(async (comment) => {
                return { ...comment, owner: await this.userRepository.getUserWithId(comment.owner) };
            })
        );

        return {
            comments: a
        };
    }

    async comment(postId: string, content: string, userId: string) {
        const id = new mongoose.Types.ObjectId();
        await this.postModel.updateOne(
            { _id: postId },
            {
                $push: { comments: { id, owner: userId, content: content } }
            }
        );

        return { id, content, owner: await this.userRepository.getUserWithId(userId) };
    }
}
