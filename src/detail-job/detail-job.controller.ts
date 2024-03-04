import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { DetailJobService } from './detail-job.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { detailJobDTO } from './dto/detail-job.dto';
import { detailDTO } from './dto/detail.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/middleware/jwt-auth';
import { RolesGuard } from 'src/middleware/role/roles.guard';
import { Roles } from 'src/middleware/role/roles.decorator';
import { Role } from 'src/middleware/role/role.enum';
import { fileDTO } from 'src/types/file.dto';

@ApiTags('ChiTietLoaiCongViec')
@Controller('detail')
export class DetailJobController {
  constructor(private readonly detailJobService: DetailJobService) {}

  @Get()
  getListDetailJob(): Promise<object | string> {
    return this.detailJobService.getListDetailJob();
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
    description: 'search Detail-job name',
  })
  @Get('/:page/:size')
  pagination(
    @Param('page') page: string,
    @Param('size') size: string,
    @Query('searchName') searchName?: string,
  ): Promise<object | string> {
    return this.detailJobService.pagination(+page, +size, searchName);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiParam({ name: 'detailJobID', description: 'Detail-job ID', type: String })
  @Get('/:detailJobID')
  detailJobById(@Param('detailJobID') id: string): Promise<object | string> {
    return this.detailJobService.detailJobById(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiParam({ name: 'detailID', description: 'Detail ID', type: String })
  @Get('/get/detail-ID/:detailID')
  detailById(@Param('detailID') id: string): Promise<object | string> {
    return this.detailJobService.detailById(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Post('/create-detail-job')
  @ApiBody({ type: detailJobDTO })
  createDetailJob(@Body() body: detailJobDTO): Promise<string> {
    return this.detailJobService.createDetailJob(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Post()
  @ApiBody({ type: detailDTO })
  createDetail(@Body() body: detailDTO): Promise<string> {
    return this.detailJobService.createDetail(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload file image',
    type: fileDTO,
  })
  @Post('/upload-image-detail-job/:detailJobID')
  @ApiParam({ name: 'detailJobID', description: 'Detail-job ID', type: String })
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('detailJobID') id: string,
  ): Promise<string> {
    return this.detailJobService.uploadImage(file, +id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Put('/update-detail-job/:detailJobID')
  @ApiParam({ name: 'detailJobID', description: 'Detail-job ID', type: String })
  @ApiBody({ type: detailJobDTO })
  updateDetailJob(
    @Param('detailJobID') id: string,
    @Body() body: detailJobDTO,
  ): Promise<string> {
    return this.detailJobService.updateDetailJob(+id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Put(':detailID')
  @ApiParam({ name: 'detailID', type: String, description: 'Detail ID' })
  @ApiBody({ type: detailDTO })
  updateDetail(
    @Param('detailID') id: string,
    @Body() body: detailDTO,
  ): Promise<string> {
    return this.detailJobService.updateDetail(+id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Delete('/delete-detail-job/:detailJobID')
  @ApiParam({ name: 'detailJobID', description: 'Detail-job ID', type: String })
  deleteDetailJob(@Param('detailJobID') id: string): Promise<string> {
    return this.detailJobService.deleteDetailJob(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @Delete(':detailID')
  @ApiParam({ name: 'detailID', type: String, description: 'Detail ID' })
  deleteDetail(@Param('detailID') id: string): Promise<string> {
    return this.detailJobService.deleteDetail(+id);
  }
}
