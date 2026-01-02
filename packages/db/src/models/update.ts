import mongoose, { type Document, Schema } from "mongoose";

export interface IUpdate extends Document {
	userId: string;
	content: string;
	mediaUrl?: string;
	xpEarned: number;
	likes: number;
	createdAt: Date;
	updatedAt: Date;
}

const UpdateSchema = new Schema<IUpdate>(
	{
		userId: { type: String, required: true, index: true },
		content: { type: String, required: true },
		mediaUrl: { type: String },
		xpEarned: { type: Number, default: 0 },
		likes: { type: Number, default: 0 },
	},
	{ timestamps: true },
);

export const Update =
	mongoose.models.Update || mongoose.model<IUpdate>("Update", UpdateSchema);
