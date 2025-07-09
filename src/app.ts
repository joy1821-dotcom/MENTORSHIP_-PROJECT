import express from "express";
import { autoMation } from "./auto/autoComplete.js";
import cors from "cors";
import homeRoute from "./routes/home.route.js";
import adminRoutes from "./routes/admin_routes/admin.routes.js";
import usersLoginRoutes from "./routes/general.routes.js";
import menteeRoutes from "./routes/mentee/mentee.routes.js";
import mentorRoutes from "./routes/mentor/mentor.routes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", homeRoute);
app.use("/api/admins", adminRoutes);
app.use("/api/users", menteeRoutes);
app.use("/api/users", usersLoginRoutes);
app.use("/api/users", mentorRoutes);

const autoCompleteJob = autoMation();
autoCompleteJob.start();

export { app };
