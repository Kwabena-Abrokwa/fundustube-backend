import mongoose from "mongoose";

const VideoScheme: mongoose.Schema = new mongoose.Schema(
	{
		video_id: {
			type: String,
			require: true,
		},
		channel_id: {
			type: String,
			require: true,
		},
		channel_name: {
			type: String,
			require: true,
		},
		donated_users: {
			type: Array,
			require: true,
		},
		donation_target: {
			type: Number,
			require: true,
		},
		donation_reached: {
			type: Number,
			require: true,
		},
		title: {
			type: String,
			require: true,
		},
		brief: {
			type: String,
			require: true,
		},
		img: {
			type: String,
			require: true,
		},
		content: {
			type: String,
			require: true,
		},
		views: {
			type: Array,
			require: true,
		},
		likes: {
			type: Array,
			require: true,
		},
		dislikes: {
			type: Array,
			require: true,
		},
		subscription: {
			type: Array,
			require: true,
		},
		comments: {
			type: Array,
			require: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("videos", VideoScheme);
