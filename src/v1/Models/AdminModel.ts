import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
	{
		admin_id: {
			type: String,
			require: true,
		},
		username: {
			type: String,
			require: true,
		},
		email: {
			type: String,
			require: true,
		},
		telephone: {
			type: String,
			require: true,
		},
		profile: {
			type: String,
			require: false,
		},
	},
	{
		timestamps: true,
	}
);