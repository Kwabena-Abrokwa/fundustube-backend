import mongoose from "mongoose";

const ChannelSchema = new mongoose.Schema(
	{
		channel_id: {
			type: String,
			require: true,
		},
		channel_name: {
			type: String,
			require: true,
		},
		owner_name: {
			type: String,
			require: false,
		},
		owner_identification_card: {
			type: String,
			require: false,
		},
		owner_location: {
			type: String,
			require: false,
		},
		owner_location_proof: {
			type: String,
			require: false,
		},
		business_name: {
			type: String,
			require: true,
		},
		business_resgistration_cert: {
			type: String,
			require: true,
		},
		business_form3: {
			type: String,
			require: false,
		},
		business_location: {
			type: String,
			require: false,
		},
		fund_account_type: {
			type: String,
			require: false,
		},
		fund_account_name: {
			type: String,
			require: true,
		},
		fund_account_number: {
			type: String,
			require: true,
		},
		approval: {
			type: Boolean,
			require: true,
		},
		status: {
			type: Boolean,
			require: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("channels", ChannelSchema);
