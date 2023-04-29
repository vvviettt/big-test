import { PostRepository } from '../respository/post.repository';
import { Injectable } from '@nestjs/common';
import { log } from 'console';
import { MediaStorageService } from 'src/mediaStorage/media_storage.service';

@Injectable()
export class PostService {
    constructor(private readonly mediaStorage: MediaStorageService, private readonly postRepository: PostRepository) {}

    async addNewPost(surveyOption: string[], surveyTitle: string, content: string, files: any[], mode?: number) {
        const paths = await this.mediaStorage.saveFiles(files);
        log(files);
        let options: any[] = [];
        if (surveyOption) {
            options = surveyOption.map((e) => ({ label: e, vote: 0 }));
        }
        const res = await this.postRepository.saveNewPost(content, paths, surveyTitle, options, mode);
        log(res);
        return {
            message: 'succes',
            post: {}
        };
    }

    async getRecommentPost() {}
}
