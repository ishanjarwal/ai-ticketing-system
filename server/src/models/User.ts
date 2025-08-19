import mongoose, { InferSchemaType, Schema } from "mongoose";

export const UserRoleValues = ["user", "moderator", "admin"] as const;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    role: {
      type: String,
      default: "user",
      enum: UserRoleValues,
    },
    skills: [{ type: String }],
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

export type UserValues = InferSchemaType<typeof userSchema>;

const User = mongoose.model<UserValues>("User", userSchema);
export default User;
