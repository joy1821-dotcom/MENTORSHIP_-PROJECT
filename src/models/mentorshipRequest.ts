import {
  Model,
  InferCreationAttributes,
  InferAttributes,
  CreationOptional,
  DataTypes,
} from "sequelize";
import { sequelize } from "../config/database_setup.js";

class MentorshipRequest extends Model<
  InferAttributes<MentorshipRequest>,
  InferCreationAttributes<MentorshipRequest>
> {
  declare id: CreationOptional<number>;
  declare mentorId: number;
  declare menteeId: number;
  declare status: "pending" | "accepted" | "rejected";
  declare notes: string;
}

MentorshipRequest.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    mentorId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    menteeId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "pending",
        "accepted",
        "rejected"
      ),
      allowNull: false,
      defaultValue: "pending",
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    
  },
  {
    sequelize,
    modelName: "MentorshipRequest",
    tableName: "mentorshipRequests",
    timestamps: true,
  }
);

export default MentorshipRequest;
