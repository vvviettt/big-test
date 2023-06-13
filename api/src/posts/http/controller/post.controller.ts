import { Body, Query, Request } from '@nestjs/common';
import { Controller, Delete, Get, Patch, Post, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { log } from 'console';
import { ApiMultiFile } from 'src/posts/decorator/swaggerAddPost.decorator';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { NewPostDto } from '../dto/newPost.dto';
import { PostService } from 'src/posts/service/post.service';
import { GetMyPostDto } from '../dto/getMyPost.dto';
import { VoteForSuveyDTO } from '../dto/voteForSuvey.dto';
import { OnlyIdDTO } from '../dto/onlyId.dto';
import { GetCommentDTO } from '../dto/getComments.dto';
import { CommentDTO } from '../dto/comment.dto';

@ApiTags('Post')
@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService) {}

    @Post()
    @ApiMultiFile('files')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('files'))
    addPost(@UploadedFiles() files, @Body() data: NewPostDto, @Request() req) {
        log(files);
        return this.postService.addNewPost(
            data.surveyOption,
            data.surveyTime,
            data.content,
            files,
            req.user.id,
            data.mode
        );
    }

    @Get('/me')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    getPost(@Request() req, @Query() data: GetMyPostDto) {
        return this.postService.getPostWithId(req.user.id, data.limit, data.page);
    }

    @Get('/for-you')
    getListPost() {}

    @Get('/my-post')
    getMyPost(@Request() req) {
        return this.postService.getPostWithId(req.user.id);
    }

    @Patch()
    updatePost() {}

    @Delete()
    deletePost() {}

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Patch('/survey')
    chooseSuveyOption(@Body() data: VoteForSuveyDTO, @Request() req) {
        return this.postService.voteForSuvey(data, req.user.id);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Patch('/love')
    lovePost(@Body() data: OnlyIdDTO, @Request() req) {
        return this.postService.loveAPost(data.id, req.user.id);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post('/comment')
    comment(@Body() data: CommentDTO, @Request() req) {
        return this.postService.comment(data.postId, data.content, req.user.id);
    }

    @Get('/comments')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    getComment(@Query() data: GetCommentDTO) {
        return this.postService.getComments(data.postId, data.limit, data.page);
    }
}
