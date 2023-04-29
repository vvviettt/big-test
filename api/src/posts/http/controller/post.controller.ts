import { Body } from '@nestjs/common';
/*
https://docs.nestjs.com/controllers#controllers
*/

import {
    Controller,
    Delete,
    Get,
    Patch,
    Post,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { log } from 'console';
import { ApiMultiFile } from 'src/posts/decorator/swaggerAddPost.decorator';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { NewPostDto } from '../dto/newPost.dto';
import { PostService } from 'src/posts/service/post.service';

@ApiTags('Post')
@Controller('post')
@UseGuards(AuthGuard)
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    @ApiMultiFile('files')
    @ApiBearerAuth()
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('files'))
    addPost(@UploadedFiles() files, @Body() data: NewPostDto) {
        log(files);
        return this.postService.addNewPost(data.surveyOption, data.surveyTitle, data.content, files, data.mode);
    }

    @Get()
    getPost() {}

    @Get('/for-you')
    getListPost() {}

    @Get('/my-post')
    getMyPost() {}

    @Patch()
    updatePost() {}

    @Delete()
    deletePost() {}
}
