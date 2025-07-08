import { Router } from "express";
import { viewAllUsers } from "../../controllers/admin/viewAllUsers.controller.js";
import { isAdmin } from "../../middlewares/isAdmin.middleware.js";
import { adminLogin } from "../../controllers/admin/adminLogin.controller.js";
import { authenticateUser } from "../../JWT/authenticate.middleware.js";
import { viewAllSession } from "../../controllers/admin/viewAllSessions.controller.js";
import { changeRole } from "../../controllers/admin/change.role.controller.js";
import { viewAmenteeSessions } from "../../controllers/admin/viewAmenteeSessions.controller.js";
import { viewAmentorsessions } from "../../controllers/admin/viewAmentorSessions.controller.js";

const router = Router();

//login
router.post("/auth/login", adminLogin);

// view users
router.get("/view/users", authenticateUser, isAdmin, viewAllUsers);

// view sessions
router.get("/view/all-sessions", authenticateUser, isAdmin, viewAllSession);

//change roles
router.post(
  "/users/:userId/change-role",
  authenticateUser,
  isAdmin,
  changeRole
);

//get a mentee's sessions
router.get(
  "/sessions/mentee/:menteeId",
  authenticateUser,
  isAdmin,
  viewAmenteeSessions
);

//get a mentor's sessions
router.get(
  "/session/mentor/mentorId",
  authenticateUser,
  isAdmin,
  viewAmentorsessions
);

//assign mentors

export default router;
