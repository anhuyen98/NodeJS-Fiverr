import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
  UseGuards,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/middleware/jwt-auth';
// import { CheckUser } from 'src/middleware/checkUser.middleware';
import { RolesGuard } from 'src/middleware/role/roles.guard';
import { Roles } from 'src/middleware/role/roles.decorator';
import { Role } from 'src/middleware/role/role.enum';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { signUpDTO } from 'src/auth/dto/sign-up.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileDTO } from 'src/types/file.dto';

@ApiTags('NguoiDung')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Get('/')
  getListUser(): Promise<object | string> {
    return this.usersService.getListUser();
  }

  @Get('/search/user-name/:userName')
  searchUserName(
    @Param('userName') userName: string,
  ): Promise<object | string> {
    return this.usersService.searchUserName(userName);
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
  @ApiQuery({
    name: 'searchName',
    required: false,
    type: String,
    description: 'search User name',
  })
  @Get('/:page/:size')
  pagination(
    @Param('page') page: string,
    @Param('size') size: string,
    @Query('searchName') searchName?: string,
  ): Promise<object | string> {
    return this.usersService.pagination(+page, +size, searchName);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiParam({ name: 'userID', description: 'User ID', type: String })
  @Get(':userID')
  userByID(@Param('userID') id: string): Promise<object | string> {
    return this.usersService.userByID(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiQuery({ name: 'role', enum: Role })
  @Post('/create-user')
  @ApiBody({ type: signUpDTO })
  createUser(
    @Body() body: signUpDTO,
    @Query('role') role: string,
  ): Promise<string> {
    return this.usersService.createUser(body, role);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Put('/update-user/:userID')
  @ApiParam({ name: 'userID', description: 'User ID', type: String })
  @ApiBody({ type: signUpDTO })
  updateUser(
    @Param('userID') id: string,
    @Body() body: signUpDTO,
  ): Promise<string> {
    return this.usersService.updateUser(+id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Delete('/delete-user/:userID')
  @ApiParam({ name: 'userID', description: 'User ID', type: String })
  deleteUser(@Param('userID') id: string): Promise<string> {
    return this.usersService.deleteUser(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiParam({ name: 'userID', description: 'User ID', type: String })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload file avatar',
    type: fileDTO,
  })
  @Post('/upload-avatar/:userID')
  @UseInterceptors(FileInterceptor('file'))
  uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Param('userID') id: string,
  ): Promise<string> {
    return this.usersService.uploadAvatar(file, +id);
  }
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard, CheckUser)
  // @Get('/:id')
  // findOne(@Param('id') id: string): Promise<any> {
  //   return this.usersService.findOne(+id);
  // }
  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.Admin)
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
