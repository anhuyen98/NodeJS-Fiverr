import { Controller, Get } from '@nestjs/common';
import { SkillService } from './skill.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Skill')
@Controller('skill')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  findAll(): Promise<string | object> {
    return this.skillService.findAll();
  }
}
