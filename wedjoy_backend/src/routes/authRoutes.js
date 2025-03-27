//Name : /routes/CredentialRoutes.js

import express from "express";
import { UserSignup, UserLogin, AdminSignup, EventOrganizerSignup, BusinessOwnerSignup,ResetPassword,verifyEmail, resendAccountVerificationLink, addEvent, getAllEvent, getSingleEvent, reset_Password, newUpdatedPassword} from "../controllers/authController.js";

const router = express.Router();

router.post('/updatePassword',newUpdatedPassword)
router.post("/reset-Password-Demo",reset_Password )

router.post("/signup", UserSignup);
router.post("/admin/signup", AdminSignup);
router.post("/eventOrganizer/signup", EventOrganizerSignup);
router.post("/businessOwner/signup", BusinessOwnerSignup);
router.post("/resetPassword",ResetPassword)
router.get("/verify-email", verifyEmail);
router.post('/resendverifyEmail',resendAccountVerificationLink)
router.post("/addEvent", addEvent);
router.get("/getAllEvent", getAllEvent);
router.post("/getSingleEvent",getSingleEvent)
// router.post("/forgotPassword",ForgotPassword)
// router.post("/verifyOTP",VerifyOTP)
// router.post("/setNewPassword",SetNewPassword) 
router.post("/login", UserLogin);

// Error handling middleware
router.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default router;


