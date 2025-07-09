import { Router } from "express";
import { usersLogin } from "../controllers/usersLogin.controller.js";
import { signup } from "../controllers/signup.controller.js";
import { signupValidator } from "../validations/signupValidation.js";
import { handleValidationResults } from "../validations/validationResults.js";
import { editProfile } from "../controllers/profileEdit.controller.js";
import { postFeedback } from "../controllers/postFeedBack.controller.js";
import { feedbackValidator } from "../validations/feedbackValidation.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.middleware.js";
import { authenticateUser } from "../JWT/authenticate.middleware.js";
import { changePassword } from "../controllers/changePassword.controller.js";
import { forgotPasswordRequest } from "../controllers/forgotPasswordRequest.controller.js";

const router = Router();

router.post("/auth/login", usersLogin);

router.post("/auth/register", signupValidator, handleValidationResults, signup);

router.post(
  "/profile/edit",
  authenticateUser,
  authorizeRoles("meetee", "mentor"),
  editProfile
);

router.post(
  "/post/feedback/:sessionId",
  authenticateUser,
  authorizeRoles("meetee", "mentor"),
  feedbackValidator,
  handleValidationResults,
  postFeedback
);

router.post(
  "/change-password",
  authenticateUser,
  authorizeRoles("meetee", "mentor"),
  changePassword
);


router.post("/forgot-password/request", forgotPasswordRequest)

export default router;
