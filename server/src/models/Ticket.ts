import mongoose, { InferSchemaType, Schema } from "mongoose";

export const TicketStatusValues = ["todo", "done", "expired"] as const;

const ticketSchema = new Schema(
  {
    title: { type: String, require: true },
    descritpion: { type: String },
    status: { type: String, default: "todo", enum: TicketStatusValues },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    moderator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    priority: { type: String },
    deadline: { type: Date },
    notes: { type: String },
    skills: [{ type: String }],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export type TicketValues = InferSchemaType<typeof ticketSchema>;

const Ticket = mongoose.model<TicketValues>("Ticket", ticketSchema);
export default Ticket;
