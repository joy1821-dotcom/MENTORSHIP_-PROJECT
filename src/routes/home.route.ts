import getData from "../controllers/home.controller.js";

import { Router } from "express";

const router = Router();

router.get("/", getData);

export default router;

//