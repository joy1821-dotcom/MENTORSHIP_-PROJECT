import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
  DataTypes,
  ForeignKey,
} from "sequelize";
import { sequelize } from "../config/database_setup.js";
import Mentor from "./mentor.js"

class TimeSlot extends Model<
  InferAttributes<TimeSlot>,
  InferCreationAttributes<TimeSlot>
> {
  declare id: CreationOptional<number>;
  declare mentorId: number;
  declare date: Date;
  declare day: string;
  declare startTime: string;
  declare endTime: string;
  declare duration: number;
  declare isBooked: boolean;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
  declare mentor?: Mentor;
}

TimeSlot.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    mentorId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    date: DataTypes.DATEONLY,
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: DataTypes.INTEGER,
    isBooked: { type: DataTypes.BOOLEAN, defaultValue: false },
  },
  {
    sequelize,
    modelName: "TimeSlot",
    tableName: "timeSlots",
    timestamps: true,
  }
);

export default TimeSlot;
