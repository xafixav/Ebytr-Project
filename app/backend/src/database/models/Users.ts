import { DataTypes, Model } from 'sequelize';
import db from '.';

class Users extends Model {
  public id: number;

  public password: string;

  public user: string;
}

Users.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: false,
  },
}, {
  underscored: false,
  sequelize: db,
  tableName: 'users',
  timestamps: false,
});

export default Users;
