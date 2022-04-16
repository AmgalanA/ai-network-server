import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { PostModel } from 'src/post/models/post.model';
import { ProfileModel } from 'src/profile/models/profile.model';
import { GroupProfilesModel } from './group-profiles.model';

interface GroupCreatingAttrs {
  name: string;
  createdAt: string;
  description: string;
  imageUrl: string;
  creatorId: number;
}

@Table({ tableName: 'group' })
export class GroupModel extends Model<GroupModel, GroupCreatingAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  createdAt: string;

  @Column({ type: DataType.STRING })
  description: string;

  @Column({ type: DataType.STRING })
  imageUrl: string;

  @ForeignKey(() => ProfileModel)
  @Column({ type: DataType.INTEGER })
  creatorId: number;

  @BelongsToMany(() => ProfileModel, () => GroupProfilesModel)
  members: ProfileModel[];

  @HasMany(() => PostModel)
  posts: PostModel[];
}
