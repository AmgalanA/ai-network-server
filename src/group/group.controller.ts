import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createPostDto } from 'src/post/dtos/create-post.dto';
import { GroupDto } from './dtos/group.dto';
import { GroupService } from './group.service';

@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post('/create')
  create(
    @UploadedFile() image: Express.Multer.File,
    @Body() groupDto: GroupDto,
  ) {
    return this.groupService.create(image, groupDto);
  }

  @Get('/get-all')
  getAll() {
    return this.groupService.getAll();
  }

  @Get('/get-one/:id')
  getOne(@Param('id') id: string) {
    return this.groupService.getOne(id);
  }

  @Post('/add-member/:id')
  addMember(
    @Param('id') id: string,
    @Body() { profileId }: { profileId: string },
  ) {
    return this.groupService.addMember(id, profileId);
  }

  @Get('/get-by-creator/:creatorId')
  getByCreator(@Param('creatorId') creatorId: string) {
    return this.groupService.getByCreator(creatorId);
  }

  @UseInterceptors(FileInterceptor('image'))
  @Post('/create-post/:groupId')
  createPost(
    @UploadedFile() image: Express.Multer.File,
    @Param('groupId') groupId: string,
    @Body() postDto: createPostDto,
  ) {
    return this.groupService.createPost(groupId, postDto, image);
  }
}
