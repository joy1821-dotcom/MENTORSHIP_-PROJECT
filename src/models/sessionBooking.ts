import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";
import { sequelize } from "../config/database_setup.js";
//import { TimeSlot, Mentee } from "./u-index.js";
import Mentor from "./mentor.js";
import Mentee from "./mentee.js";
import TimeSlot from "./timeSlot.js";

class SessionBooking extends Model<
  InferAttributes<SessionBooking>,
  InferCreationAttributes<SessionBooking>
> {
  declare id: CreationOptional<number>;
  declare menteeId: number;
  declare timeSlotId: number;
  declare status: string;
  declare timeSlot?: TimeSlot;
  declare mentor?: Mentor;
  declare mentee?: Mentee;
}


SessionBooking.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    menteeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    timeSlotId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "ongoing", "completed", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "SessionBooking",
    tableName: "sessionBookings",
    timestamps: true,
  }
);


export default SessionBooking;
