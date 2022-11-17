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

// refresh token

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
router.get("/users/:name", verifyTokenExists, userController.findUserByName);
router.post("/users/add/:id", verifyTokenExists, userController.addFollow);
router.post(
  "/users/:id",
  verifyTokenExists,
  uploadImages,
  userController.update
);
router.patch("/users/update/:id", verifyTokenExists, userController.update);
router.patch(
  "/users/password/:id",
  verifyTokenExists,
  userController.updatePassword
);

//posts routes
router.get("/posts", verifyTokenExists, postController.getAllPosts);
router.get('/posts/feed/:id', verifyTokenExists, postController.myFeed)
router.get("/posts/user/:id", verifyTokenExists, postController.getPostByUser);
router.get('/posts/comments/:id', verifyTokenExists, postController.getPostComments)
router.get("/posts/:id", verifyTokenExists, postController.getPostById);
router.post("/posts", verifyTokenExists, uploadImages, postController.newPost);
router.post("/posts/like/:post", verifyTokenExists, postController.addLike);
router.post("/posts/comments/:id", verifyTokenExists, postController.addComment)
router.patch("/posts/:id", verifyTokenExists, postController.update);
router.delete("/posts", verifyTokenExists, postController.deletePost)



export default router;
