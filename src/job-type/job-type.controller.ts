import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JobTypeService } from './job-type.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { jobTypeDTO } from './dto/job-type.dto';
import { JwtAuthGuard } from 'src/middleware/jwt-auth';
import { RolesGuard } from 'src/middleware/role/roles.guard';
import { Roles } from 'src/middleware/role/roles.decorator';
import { Role } from 'src/middleware/role/role.enum';

@ApiTags('LoaiCongViec')
@Controller('job-type')
export class JobTypeController {
  constructor(private readonly jobTypeService: JobTypeService) {}

  @Get('/')
  getListJobType(): Promise<object | string> {
    return this.jobTypeService.getListJobType();
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
    description: 'search Job-type name',
  })
  @Get('search/:page/:size')
  pagination(
    @Param('page') page: string,
    @Param('size') size: string,
    @Query('searchName') searchName?: string,
  ): Promise<object | string> {
    return this.jobTypeService.pagination(+page, +size, searchName);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiParam({ name: 'jobTypeID', type: String, description: 'Job-type ID' })
  @Get(':jobTypeID')
  jobTypeByID(@Param('jobTypeID') id: string): Promise<object | string> {
    return this.jobTypeService.jobTypeByID(+id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiBody({ type: jobTypeDTO })
  @Post('/create-job-type')
  createJobType(@Body() body: jobTypeDTO): Promise<string> {
    return this.jobTypeService.createJobType(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiBody({ type: jobTypeDTO })
  @ApiParam({ name: 'jobTypeID', description: 'Job-type ID', type: String })
  @Put('/update-job-type/:jobTypeID')
  updateJobType(
    @Param('jobTypeID') id: string,
    @Body() body: jobTypeDTO,
  ): Promise<string> {
    return this.jobTypeService.updateJobType(+id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @ApiParam({ name: 'jobTypeID', description: 'Job-type ID', type: String })
  @Delete('/delete-job-type/:jobTypeID')
  deleteJobType(@Param('jobTypeID') id: string): Promise<string> {
    return this.jobTypeService.deleteJobType(+id);
  }
}
