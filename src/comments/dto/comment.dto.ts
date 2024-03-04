import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class commentDTO {
  @ApiProperty({ type: Number, description: 'Job ID' })
  @IsNotEmpty()
  job_id: number;

  @ApiProperty({ type: Number, description: 'User ID' })
  @IsNotEmpty()
  user_id: number;

  // @ApiProperty({ type: Date, description: 'Day you comment' })
  comment_day: Date;

  @ApiProperty({ type: String, description: 'Content of comment' })
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: Number, description: 'Star for comment' })
  @IsNotEmpty()
  comment_star: number;
}
