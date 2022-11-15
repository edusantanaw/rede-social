import { Router } from "express";
import AuthController from "../controllers/auth/authController";
import { PostController } from "../controllers/posts/postController";
import { verifyTokenExists } from "../middlewares/verifyToken";
import { uploadImages } from "../middlewares/multer";
import { UserController } from "../controllers/user/userController";

const authController = new AuthController();
const postController = new PostController();
const userController = new UserController()


const router = Router();

// auth routes
router.post("/user", authController.create);
router.post("/signin", authController.login);

// user routes
router.post('/user/:id', verifyTokenExists, uploadImages, userController.update)


//posts routes
router.get("/posts/:id", verifyTokenExists, postController.getPostById);
router.post("/posts", verifyTokenExists, uploadImages, postController.newPost);

export default router;
