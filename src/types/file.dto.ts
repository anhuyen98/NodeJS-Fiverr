import { ApiProperty } from '@nestjs/swagger';

export class fileDTO {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  file: Express.Multer.File;
}
