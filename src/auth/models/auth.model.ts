import {
  Model,
  Column,
  DataType,
  Table,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';

import { ProfileModel } from '../../profile/models/profile.model';

interface authCreatingAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'user' })
export class AuthModel extends Model<AuthModel, authCreatingAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @Column({ type: DataType.STRING })
  password: string;

  @ForeignKey(() => ProfileModel)
  @Column({ type: DataType.INTEGER })
  profileId: number;
}
