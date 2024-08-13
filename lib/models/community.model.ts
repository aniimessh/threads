import mongoose from "mongoose";

const communitySchema = new mongoose.Schema({
	id: { type: String, required: true },
	username: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	bio: { type: String },
	createdBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	image: { type: String },
	threads: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Threads",
		},
	],
    members:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
	onboarded: { type: Boolean, default: false },
	communities: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Community",
		},
	],
});

const Community =
	mongoose.models.Community || mongoose.model("Community", communitySchema);
export default Community;
