import { DataTypes, Model } from 'sequelize';
import db from '.';
import Users from './Users';

class Tasks extends Model {
  public id: number;

  public task: string;

  public userId: number;

  public status: string;
}

Tasks.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    unique: true,
    primaryKey: true,
  },
  task: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  status: {
    type: DataTypes.STRING,
  },
}, {
  underscored: false,
  sequelize: db,
  tableName: 'tasks',
  timestamps: false,
});

Tasks.belongsTo(Users, { foreignKey: 'userId', as: 'user' });

export default Tasks;
