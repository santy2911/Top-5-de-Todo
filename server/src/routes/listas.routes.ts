import { Router } from "express";
import * as ListasController from "../controllers/listas.controller";

const router = Router();

router.get("/", ListasController.getAll);
router.get("/:id", ListasController.getById);
router.post("/", ListasController.create);
router.put("/:id", ListasController.update);
router.delete("/:id", ListasController.remove);

export default router;