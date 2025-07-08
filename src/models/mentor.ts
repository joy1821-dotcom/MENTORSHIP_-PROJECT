import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";
import {sequelize} from "../config/database_setup.js"
import { hashPassword } from "../hash/hashPassword.js";

class Mentor extends Model<
  InferAttributes<Mentor>,
  InferCreationAttributes<Mentor>
> {
  declare id: CreationOptional<number>;
  declare firstName: CreationOptional<string>;
  declare lastName: CreationOptional<string>;
  declare shortBio: CreationOptional<string>;
  declare email: string;
  declare goals: CreationOptional<string>;
  declare skills: CreationOptional<string[]>;
  declare password: string;
  declare isAvailable: CreationOptional<boolean>;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

Mentor.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    shortBio: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    goals: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    skills: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Mentor",
    tableName: "mentors",
    timestamps: true,
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
    },
  }
);

export default Mentor;
