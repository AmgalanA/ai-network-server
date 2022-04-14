import {
  Body,
  Controller,
  Post,
  UploadedFile,
  Get,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CreateProfileDto } from './dtos/create-profile.dto';
import { ProfileService } from './profile.service';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @UseInterceptors(FileInterceptor('avatar'))
  @Post('/create')
  create(
    @UploadedFile() avatar: Express.Multer.File,
    @Body() profileDto: CreateProfileDto,
  ) {
    return this.profileService.create(profileDto, avatar);
  }

  @Get('/get/:email')
  getByEmail(@Param('email') email: string) {
    return this.profileService.getByEmail(email);
  }

  @Get('/get-by-id/:id')
  getById(@Param('id') id: string) {
    return this.profileService.getById(id);
  }

  @Get('/get-all')
  getAll() {
    return this.profileService.getAll();
  }
}
