import { Router } from "express";
import { mentorshipRequest } from "../../controllers/mentee/mentorshipRequest.controller.js";
import { authorizeRoles } from "../../middlewares/authorizeRoles.middleware.js";
import { authenticateUser } from "../../JWT/authenticate.middleware.js";
import { viewAllMentors } from "../../controllers/mentee/viewMentors.controller.js";
import { requestsStatus } from "../../controllers/mentee/requestsStatus.controller.js";
import { bookSession } from "../../controllers/mentee/bookSession.controller.js";

const router = Router();

router.post(
  "/:mentorId/request/mentorship",
  authenticateUser,
  authorizeRoles("mentee"),
  mentorshipRequest
);

router.get("/view/mentors", authenticateUser, authorizeRoles("mentee"), viewAllMentors);


router.post(
  "/sessions/:mentorId/book",
  authenticateUser,
  authorizeRoles("mentee"),
  bookSession
);

router.get(
  "/requests/status",
  authenticateUser,
  authorizeRoles("mentee"),
  requestsStatus
);

export default router;
