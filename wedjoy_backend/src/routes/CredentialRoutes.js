//Name : /routes/CredentialRoutes.js

import express from "express";
import { updateLoginHistory } from "../controllers/credentialController.js";

const router = express.Router();

router.post("/update-login-history", updateLoginHistory);

export default router;
