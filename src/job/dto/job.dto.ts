import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class jobDTO {
  @ApiProperty({ type: String, description: 'Name of job' })
  @IsNotEmpty()
  job_name: string;

  @ApiProperty({ type: Number, description: 'Evaluation of job' })
  @IsNotEmpty()
  evaluation: number;

  @ApiProperty({ type: Number, description: 'Price for job' })
  @IsNotEmpty()
  price: number;

  @ApiProperty({ type: String, description: 'Image of job' })
  @IsNotEmpty()
  job_image: string;

  @ApiProperty({ type: String, description: 'Description about job' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: String, description: 'Summary about job' })
  @IsNotEmpty()
  sub_desc: string;

  @ApiProperty({ type: Number, description: 'Star for job ' })
  @IsNotEmpty()
  job_star: number;

  @ApiProperty({ type: Number, description: 'Detail-job ID' })
  @IsNotEmpty()
  detail_id: number;

  @ApiProperty({ type: Number, description: 'User ID' })
  @IsNotEmpty()
  user_id: number;
}
