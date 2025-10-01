import { Router } from "express";
import { postsController } from "../controllers/main.js";
const PostRouter = Router();

PostRouter.get("/",postsController.find);
PostRouter.get("/:id",postsController.findOne);
PostRouter.post("/",postsController.create);
PostRouter.put("/:id",postsController.update);
PostRouter.delete("/:id",postsController.delete);



export default PostRouter;