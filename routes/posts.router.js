import { Router } from "express";
import { postsController } from "../controllers/main.js";
const router = Router();

router.get("/",postsController.find);
router.get("/:id",postsController.findOne);
router.post("/",postsController.create);
router.put("/:id",postsController.update);
router.delete("/:id",postsController.delete);



export { router as postsController};