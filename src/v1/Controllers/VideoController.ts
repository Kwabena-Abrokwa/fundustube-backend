import { Request, Response } from "express";
import fs from "fs";
import { VideoDatas } from "../Data/VideoData";

export const getAllVideos = async (req: Request, res: Response) => {
	return res.json(VideoDatas);
};

export const getStreamingVideos = async (req: Request, res: Response) => {
	const video_id = req.params.id;

	return res.json(VideoDatas.filter((item) => item.video_id === video_id));
};

export const likeVideoAction = async (req: Request, res: Response) => {
	const video_id = req.params.id;
	const user_id = req.body.user_id;

	const video = VideoDatas.filter((item) => item.video_id == video_id);

	if (
		video[0].likes.includes(user_id) ||
		video[0].dislikes.includes(user_id)
	) {
		console.log("Exist");
		return res.json(video[0].likes.length);
	} else {
		video[0].likes.push(user_id);
		console.log("Success");

		return res.json(video[0].likes.length);
	}
};

export const dislikeVideoAction = async (req: Request, res: Response) => {
	const video_id = req.params.id;
	const user_id = req.body.user_id;

	const video = VideoDatas.filter((item) => item.video_id == video_id);

	if (
		video[0].likes.includes(user_id) ||
		video[0].dislikes.includes(user_id)
	) {
		console.log("Exist");
		return res.json(video[0].dislikes.length);
	} else {
		video[0].dislikes.push(user_id);
		console.log("Success");

		return res.json(video[0].dislikes.length);
	}
};

export const videoStreamingLogic = async (req: Request, res: Response) => {
	const video = req.params.id;

	//use the video id to get the videe to play
	//set the path to get the video to stream to user
	const videoPath = `${__dirname}/Assets/${video}.mp4`;

	//get the video size using the file system
	const videoStat = fs.statSync(videoPath);
	const videoSize = videoStat.size;

	//get the video range from the req headers
	const range = req.headers.range;

	if (range) {
		const parts = range.replace(/bytes=/, "").split("-");

		//where to start reading the video data to send
		const start: number = parseInt(parts[0], 10);

		const end: number = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;

		//the amount of data to be sent to user per chunk
		const chunkSize = end - start + 1;

		//Use the file system to read the data in the video file using createReadStream

		const stream = fs.createReadStream(videoPath, { start, end });

		const headers = {
			"Content-Range": `bytes ${start}-${end}/${videoSize}`,
			"Accept-Ranges": "bytes",
			"Content-Length": chunkSize,
			"Content-Type": "video/mp4",
		};

		res.writeHead(206, headers);

		stream.pipe(res);
	} else {
		const headers = {
			"Content-Length": videoSize,
			"Content-Type": "video/mp4",
		};

		res.writeHead(206, headers);
		fs.createReadStream(videoPath).pipe(res);
	}
};
