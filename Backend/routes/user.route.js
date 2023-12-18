import  express  from "express";
const router = express.Router();
import {register, login, getAllUsers, adminRouteHandler} from "../controllers/user.controller.js";
import { authenticateWithToken } from "../middlewares/middlewares.js";
import { verifyTokenAndRole } from "../middlewares/adminMiddlewares.js"

router.post("/user", register);
router.post("/user/login",  login)
router.get("/user", verifyTokenAndRole("customer"), getAllUsers);
// router.get('/user/admin', verifyTokenAndRole('admin'), adminRouteHandler);





export default router;