import { Router } from "express";
import AuthController from "../controllers/auth/authController";
import { PostController } from "../controllers/posts/postController";
import { verifyTokenExists } from "../middlewares/verifyToken";
import { uploadImages } from "../middlewares/multer";
import { UserController } from "../controllers/user/userController";

const authController = new AuthController();
const postController = new PostController();
const userController = new UserController();

const router = Router();

// auth routes

router.post("/user", authController.create);
router.post("/signin", authController.login);

// user routes
router.get("/users", verifyTokenExists, userController.getAllUsers);
router.get(
  "/users/following/:id",
  verifyTokenExists,
  userController.getUserFollowing
);
router.get(
  "/users/followers/:id",
  verifyTokenExists,
  userController.getUserFollowers
);
router.get("/users/:name", userController.findUserByName);
router.post("/users/add/:id", verifyTokenExists, userController.addFollow);
router.post(
  "/users/:id",
  verifyTokenExists,
  uploadImages,
  userController.update
);

//posts routes
router.get("/posts", verifyTokenExists, postController.getAllPosts);
router.get("/posts/user/:id", verifyTokenExists, postController.getPostByUser);
router.get("/posts/:id", verifyTokenExists, postController.getPostById);
router.post("/posts", verifyTokenExists, uploadImages, postController.newPost);
router.post("/posts/like/:post", verifyTokenExists, postController.addLike);

export default router;
