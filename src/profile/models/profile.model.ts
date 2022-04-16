import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import { GroupProfilesModel } from 'src/group/models/group-profiles.model';
import { GroupModel } from 'src/group/models/group.model';

import { AuthModel } from '../../auth/models/auth.model';

interface ProfileCreatingAttrs {
  name: string;
  secondName: string;
  email: string;
  lastSeen: string | number | Date;
  status: string;
  avatar: string;
}

@Table({ tableName: 'profile' })
export class ProfileModel extends Model<ProfileModel> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ type: DataType.STRING })
  secondName: string;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  lastSeen: string | number | Date;

  @Column({ type: DataType.STRING })
  status: string;

  @Column({ type: DataType.STRING })
  avatar: string;

  @ForeignKey(() => AuthModel)
  @Column({ type: DataType.INTEGER })
  authId: number;

  @BelongsToMany(() => GroupModel, () => GroupProfilesModel)
  groups: GroupModel[];
}
