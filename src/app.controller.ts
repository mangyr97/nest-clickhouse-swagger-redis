import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateDto } from './dto/create.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<string> {
    return await this.appService.query();
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  create(@Body() dto: CreateDto) {
    console.log('post');
    return dto
  }
}
