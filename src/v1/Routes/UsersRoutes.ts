import express from "express";
import { createUserAccount } from "../Controllers/UsersController";

const router = express.Router();

router.post("/create-account", createUserAccount);

export default router;
