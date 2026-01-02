import mongoose, { type Document, Schema } from "mongoose";

export interface ISeason extends Document {
	number: number;
	title: string;
	startDate: Date;
	endDate: Date;
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
}

const SeasonSchema = new Schema<ISeason>(
	{
		number: { type: Number, required: true, unique: true },
		title: { type: String, required: true },
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		isActive: { type: Boolean, default: false },
	},
	{ timestamps: true },
);

export const Season =
	mongoose.models.Season || mongoose.model<ISeason>("Season", SeasonSchema);
