import express, { Router } from "express";
import {
	dislikeVideoAction,
	getAllVideos,
	getStreamingVideos,
	likeVideoAction,
	videoStreamingLogic,
} from "../Controllers/VideoController";

const router: Router = express.Router();

router.get("/getAllVideos", getAllVideos);

router.get("/getStreamingVideos/:id", getStreamingVideos);

router.get("/stream/:id", videoStreamingLogic);

router.post("/likeAction/:id", likeVideoAction);

router.post("/dislikeAction/:id", dislikeVideoAction);

export default router;
