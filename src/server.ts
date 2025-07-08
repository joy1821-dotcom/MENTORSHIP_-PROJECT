import { sequelize } from "./config/database_setup.js";
import { app } from "../src/app.js";
import dotenv from "dotenv";
import seedAdmin from "./seed/seedAdmin.js";
import { seedMentees} from "./seed/seedMentees.js";
import { seedMentors } from "./seed/seedMentor.js";
import "./models/u-index.js";

dotenv.config();

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database is connected");
    
    await sequelize.sync({ });
    console.log("Database is synched");

    await seedAdmin();
    console.log("Admin is seeded");

    await seedMentees();
    console.log("Mentees are created")

    await seedMentors();
    console.log("Mentors are created")
    
    app.listen(process.env.PORT, () => {
      console.log(`Server is running at ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Error in server", error);
  }
};

startServer();
