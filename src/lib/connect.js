import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI + "Reelify";
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectMongo() {
  if (cached.conn) {
    return cached.conn;
  }

  //   if (!cached.promise) {
  //     cached.promise = mongoose
  //       .connect(MONGO_URI, {
  //         useNewUrlParser: true,
  //         useUnifiedTopology: true,
  //       })
  //       .then((mongoose) => mongoose);
  //   }
  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      maxPoolSize: 10,
    };

    cached.promise = mongoose
      .connect(MONGO_URI, opts)
      .then((mongoose) => mongoose.connection);

    //   cached.conn = await cached.promise;
    //   return cached.conn;
  }
  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw new Error(e.message);
  }
  return cached.conn;
}
export default connectMongo;

// Concept of "edge" in Next.js
// Edge functions are serverless functions that run on the edge, closer to the user, rather than in a centralized data center. They are designed to be lightweight and fast, allowing for low-latency responses to user requests. Edge functions are typically used for tasks such as authentication, A/B testing, and personalization, where quick response times are critical.
// Connection is cached globally to avoid multiple connections and memory leaks

// If already connected --> Return connection ✅
// Else
//    If no promise --> Start connecting
//    Save promise
//    Await promise
//    Save the final connection
// Return connection

// Hot Reload happens often → you MUST use caching like this. Otherwise, server will open 10-20 MongoDB connections → MongoDB error: "Too many connections."
