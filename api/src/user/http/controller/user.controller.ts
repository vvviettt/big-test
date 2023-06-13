import { UserService } from './../../service/user.service';
import { Body, Controller, Get, Patch, Request, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { ApiMultiFile } from 'src/posts/decorator/swaggerAddPost.decorator';
import { UpdateUserDto } from '../dto/update-use.dto';
import { FormDataRequest } from 'nestjs-form-data';

@UseGuards(AuthGuard)
@Controller('/user')
@ApiTags('User')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    @ApiBearerAuth()
    getUserInformation(@Request() req) {
        return this.userService.getUserInformation(req.user.id);
    }

    @Patch('/info')
    @ApiBearerAuth()
    @ApiBody({
        required: true,
        type: 'multipart/form-data',
        schema: {
            type: 'object',
            properties: {
                avatar: {
                    type: 'string',
                    format: 'binary'
                },
                coverImage: {
                    type: 'string',
                    format: 'binary'
                },
                firstName: {
                    type: 'string',
                    required: []
                },
                lastName: {
                    type: 'string',
                    required: []
                },
                description: {
                    type: 'string'
                }
            }
        }
    })
    @ApiConsumes('multipart/form-data')
    @FormDataRequest()
    // @UseInterceptors(FilesInterceptor('avatar'))
    changeUserInformation(@UploadedFiles() files, @Body() data: UpdateUserDto, @Request() req) {
        return this.userService.changeUserInformation(req.user.id, data);
    }
}
