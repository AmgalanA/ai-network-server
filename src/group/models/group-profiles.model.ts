import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ProfileModel } from 'src/profile/models/profile.model';
import { GroupModel } from './group.model';

@Table({ tableName: 'group-profiles', createdAt: false, updatedAt: false })
export class GroupProfilesModel extends Model<GroupProfilesModel> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => GroupModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  groupId: number;

  @ForeignKey(() => ProfileModel)
  @Column({ type: DataType.INTEGER, allowNull: false })
  profileId: number;
}
