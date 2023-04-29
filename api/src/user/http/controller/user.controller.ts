import { UserService } from './../../service/user.service';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/core/guards/auth.guard';

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
}
