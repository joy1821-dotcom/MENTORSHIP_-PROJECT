import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";
import { sequelize } from "../config/database_setup.js";

class SessionFeedback extends Model<
  InferAttributes<SessionFeedback>,
  InferCreationAttributes<SessionFeedback>
> {
  declare id: CreationOptional<number>;
  declare sessionBookingId: number;
  declare menteeRating: CreationOptional<number>;
  declare mentorRating: CreationOptional<number>;
  declare mentorComment: string;
  declare menteeComment: string;
}

SessionFeedback.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    sessionBookingId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    menteeRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mentorRating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    menteeComment: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    mentorComment: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
  },
  {
    sequelize,
    modelName: "SessionFeedback",
    tableName: "sessionFeedbacks",
    timestamps: true,
  }
);

export default SessionFeedback;
