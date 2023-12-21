import  express  from "express";
const router = express.Router();
import {register, login, getAllUsers, adminRouteHandler, forgetPassword, verifyOtp} from "../controllers/user.controller.js";
import { authenticateWithToken } from "../middlewares/middlewares.js";
import { verifyTokenAndRole } from "../middlewares/adminMiddlewares.js"

router.post("/user", register);
router.post("/user/login",  login)
router.get("/user", getAllUsers);
router.get('/user/admin', verifyTokenAndRole('admin'), adminRouteHandler);
router.post("/user-forget", forgetPassword)
router.post("/otp-verify", verifyOtp)





export default router;