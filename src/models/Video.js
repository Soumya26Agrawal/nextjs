// models/User.js
import mongoose, { Schema, model, models } from "mongoose";

const videoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    // duration: {
    //   type: Number,
    //   required: true,
    // },
    // uploadedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    controls: {
      type: Boolean,
      default: true,
    },
    transformation: {
      height: { type: Number, default: 1920 },
      width: { type: Number, default: 1080 },
      quality: { type: Number, min: 1, max: 100 },
    },
  },
  { timestamps: true }
);
// The timestamps option automatically adds createdAt and updatedAt fields to the schema, which can be useful for tracking when a document was created or last updated.

// If the model already exists, use it; otherwise, create it
const Video = models.Video || model("Video", videoSchema);
// models is an array containing all the models that have been created so far. If a model with the same name already exists, it will be used instead of creating a new one. This is useful in development environments where hot reloading can cause models to be defined multiple times.
// This prevents the error "Cannot overwrite `User` model once compiled" when the model is redefined during hot reloading.
export default Video;
