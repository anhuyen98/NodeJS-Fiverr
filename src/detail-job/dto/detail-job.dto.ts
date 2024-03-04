import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class detailJobDTO {
  @ApiProperty({ type: String, description: 'Name of detail job' })
  @IsNotEmpty()
  detail_name: string;

  @ApiProperty({ type: String, description: 'Image of detail job' })
  @IsNotEmpty()
  detail_image: string;

  @ApiProperty({ type: Number, description: 'Job-type ID' })
  @IsNotEmpty()
  job_type_id: number;
}
