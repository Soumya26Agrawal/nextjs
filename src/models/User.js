// models/User.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // Hash the password before saving the user document
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});
// The timestamps option automatically adds createdAt and updatedAt fields to the schema, which can be useful for tracking when a document was created or last updated.

// If the model already exists, use it; otherwise, create it
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
