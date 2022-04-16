import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { createCommentDto } from './dtos/create-comment.dto';
import { createMusicDto } from './dtos/create-music.dto';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController {
  constructor(private musicService: MusicService) {}

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'picture', maxCount: 1 },
      { name: 'audio', maxCount: 1 },
    ]),
  )
  @Post('/create')
  create(
    @UploadedFiles()
    files: { picture: Express.Multer.File; audio: Express.Multer.File },
    @Body() musicDto: createMusicDto,
  ) {
    return this.musicService.create(files.picture[0], files.audio[0], musicDto);
  }

  @Get('/get-all')
  getAll(@Query('limit') limit: number) {
    return this.musicService.getAll(limit);
  }

  @Get('/get-one/:id')
  getOne(@Param('id') id: number) {
    return this.musicService.getOne(id);
  }

  @Post('/send-comment/:musicId')
  sendComment(
    @Body() commentDto: createCommentDto,
    @Param('musicId') musicId: number,
  ) {
    return this.musicService.sendComment(commentDto, musicId);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    console.log(query);
    return this.musicService.search(query);
  }
}
