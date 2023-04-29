import { SurveyOption } from '../interfaces/SurveyOption';
import { Injectable, BadRequestException, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Post, PostDocument } from 'src/posts/schema/post.schema';
@Injectable()
export class PostRepository {
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

    async saveNewPost(
        content: string,
        images: string[],
        surveyTitle: string,
        surveyOptions: SurveyOption[],
        mode: number
    ) {
        return await new this.postModel({
            content,
            images,
            surveyTitle,
            surveyOptions,
            mode
        }).save();
    }
}
