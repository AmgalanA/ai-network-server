import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createCommentDto } from './dtos/create-comment.dto';

import { createPostDto } from './dtos/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Post('/create')
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() postDto: createPostDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.postService.create(postDto, image);
  }

  @Get('/get-all')
  getAll() {
    return this.postService.getAll();
  }

  @Get('/get-one/:id')
  getOne(@Param('id') id: number) {
    return this.postService.getOne(id);
  }

  @Get('/get-specific-posts/:creatorId')
  getSpecificPosts(@Param('creatorId') creatorId: number) {
    return this.postService.getSpecificPosts(creatorId);
  }

  @Post('/send-comment/:postId')
  sendComment(
    @Param('postId') postId: number,
    @Body() commentDto: createCommentDto,
  ) {
    return this.postService.sendComment(postId, commentDto);
  }

  @Get('/search')
  search(@Query('query') query: string) {
    return this.postService.search(query);
  }
}
