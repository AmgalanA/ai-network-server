import {
  Model,
  Column,
  DataType,
  ForeignKey,
  Table,
  HasMany,
} from 'sequelize-typescript';
import { ProfileModel } from 'src/profile/models/profile.model';
import { CommentModel } from './comment.model';

interface PostCreatingAttrs {
  title: string;
  text: string;
  creatorId: number;
  imageUrl: string;
  postedAt: string | number;
}

@Table({ tableName: 'post' })
export class PostModel extends Model<PostModel, PostCreatingAttrs> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  title: string;

  @Column({ type: DataType.STRING })
  text: string;

  @Column({ type: DataType.STRING })
  postedAt: string;

  @Column({ type: DataType.STRING })
  imageUrl: string;

  @ForeignKey(() => ProfileModel)
  @Column({ type: DataType.INTEGER })
  creatorId: number;

  @HasMany(() => CommentModel)
  comments: CommentModel[];
}
