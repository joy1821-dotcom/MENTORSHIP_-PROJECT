import { Sequelize } from "sequelize";

import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_name as string,
  process.env.DB_username as string,
  process.env.DB_password || "",
  {
    host: process.env.DB_host,
    dialect: "mysql",
    port: Number(process.env.DB_port),
    logging: Boolean(process.env.DB_logging),
  }
);

export {
  sequelize
};
