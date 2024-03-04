import { Module } from '@nestjs/common';
import { DetailJobService } from './detail-job.service';
import { DetailJobController } from './detail-job.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [CloudinaryModule],
  controllers: [DetailJobController],
  providers: [DetailJobService],
})
export class DetailJobModule {}
