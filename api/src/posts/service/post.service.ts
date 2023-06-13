import { PostRepository } from '../repository/post.repository';
import { Injectable } from '@nestjs/common';
import { MediaStorageService } from 'src/mediaStorage/media_storage.service';
import { VoteForSuveyDTO } from '../http/dto/voteForSuvey.dto';

@Injectable()
export class PostService {
    constructor(private readonly mediaStorage: MediaStorageService, private readonly postRepository: PostRepository) {}

    async addNewPost(
        surveyOption: string[],
        surveyTime: number,
        content: string,
        files: any[],
        ownerId: string,
        mode?: number
    ) {
        const paths = await this.mediaStorage.saveFiles(files);
        let options: any[] = [];
        if (surveyOption) {
            options = surveyOption.map((e) => ({ label: e, vote: 0 }));
        }
        await this.postRepository.saveNewPost(content, paths, options, surveyTime, mode, ownerId);
        return {
            message: 'succes',
            post: {}
        };
    }

    async getPostWithId(id: string, limit?: number, page?: number) {
        return await this.postRepository.getPostWithId(id, limit, page);
    }

    async voteForSuvey(data: VoteForSuveyDTO, userId: string) {
        return this.postRepository.voteForSuvey(data.postId, data.index, userId);
    }

    async loveAPost(postId: string, userId: string) {
        return this.postRepository.lovePost(postId, userId);
    }

    async getComments(postId: string, limit?: number, page?: number) {
        return this.postRepository.getComments(postId, limit, page);
    }

    async comment(postId: string, content: string, userId: string) {
        return this.postRepository.comment(postId, content, userId);
    }
}
