import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { commentDTO } from './dto/comment.dto';
import { JwtAuthGuard } from 'src/middleware/jwt-auth';
import { RolesGuard } from 'src/middleware/role/roles.guard';
import { Roles } from 'src/middleware/role/roles.decorator';
import { Role } from 'src/middleware/role/role.enum';

@ApiTags('BinhLuan')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getListComment(): Promise<string | object> {
    return this.commentsService.getListComment();
  }

  @ApiParam({
    name: 'page',
    type: String,
    description: 'page you need get data',
  })
  @ApiParam({
    name: 'size',
    type: String,
    description: 'limit data in one page',
  })
  @Get('/:page/:size')
  pagination(
    @Param('page') page: string,
    @Param('size') size: string,
  ): Promise<string | object> {
    console.log('page: ', page);
    console.log('size: ', size);
    return this.commentsService.pagination(+page, +size);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiParam({ name: 'jobID', type: String, description: 'Job ID' })
  @Get(':jobID')
  commentByJobId(@Param('jobID') id: string): Promise<string | object> {
    return this.commentsService.commentByJobId(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Post('/create-comment')
  @ApiBody({ type: commentDTO })
  createComment(@Body() body: commentDTO): Promise<string> {
    return this.commentsService.createComment(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Put('/update-comment/:commentID')
  @ApiParam({ name: 'commentID', type: String, description: 'comment ID' })
  @ApiBody({ type: commentDTO })
  updateComment(
    @Param('commentID') id: string,
    @Body() body: commentDTO,
  ): Promise<string> {
    return this.commentsService.updateComment(+id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Delete('/delete-comment/:commentID')
  @ApiParam({ name: 'commentID', type: String, description: 'comment ID' })
  deleteComment(@Param('commentID') id: string): Promise<string> {
    return this.commentsService.deleteComment(+id);
  }
}
