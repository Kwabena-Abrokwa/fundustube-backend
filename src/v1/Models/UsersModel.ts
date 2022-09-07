import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema(
	{
		user_id: {
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
		profile: {
			type: String,
			require: true,
		},
		password: {
			type: String,
			require: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("users", UsersSchema);
