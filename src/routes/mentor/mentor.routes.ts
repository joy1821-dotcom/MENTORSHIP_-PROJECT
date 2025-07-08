import {Router} from 'express';
import { acceptMentorshipRequest } from '../../controllers/mentor/acceptMentorshipRequest.controller.js';
import { authorizeRoles } from '../../middlewares/authorizeRoles.middleware.js';
import { authenticateUser } from '../../JWT/authenticate.middleware.js';
import { createTimeSlot } from '../../controllers/mentor/createTimeSlot.controller.js';

import { upComingRequests } from '../../controllers/mentor/upComingRequest.controller.js';
import { upcomingSessions } from '../../controllers/mentor/upcomingSessions.controller.js';

const router = Router();

router.post(
  "/:menteeId/accept-mentorship-requests/:requestId",
  authenticateUser,
  authorizeRoles("mentor"),
  acceptMentorshipRequest
);

router.patch(
  "/update/availability",
  authenticateUser,
  authorizeRoles("mentor"),
  createTimeSlot
);


//upcoming sessions
router.get(
  "/upcoming/sessions",
  authenticateUser,
  authorizeRoles("mentor"),
  upcomingSessions
);

//upcoming requests
router.get(
  "/upcoming/requests",
  authenticateUser,
  authorizeRoles("mentor"),
  upComingRequests
);

export default router;

