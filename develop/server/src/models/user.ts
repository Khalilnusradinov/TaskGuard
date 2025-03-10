import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db'; // Ensure this path is correct

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Ensure this is correctly imported from your `db.ts`
    modelName: 'User',
    tableName: 'users',
    timestamps: false,
  }
);

export default User;
