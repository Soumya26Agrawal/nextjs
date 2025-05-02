import { authOptions } from "@/lib/auth";
import connectMongo from "@/lib/connect";
import Video from "@/models/Video";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectMongo(); // Connect to MongoDB
    const videos = await Video.find({}).sort({ createdAt: -1 }); // Fetch all videos sorted by createdAt in descending order
    return NextResponse.json(videos, { status: 200 });
  } catch (error) {
    console.error("Error fetching videos:", error);
    return NextResponse.json(
      { message: "Error while fetching videos" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { title, description, thumbnailUrl, videoUrl, quality, controls } =
      await request.json();
    console.log("Received data:", { title, description, thumbnail, videoUrl });
    if (
      [title, description, thumbnailUrl, videoUrl].some(
        (field) => field == null || field.trim() === ""
      )
    ) {
      console.log("Missing fields:", {
        title,
        description,
        thumbnailUrl,
        videoUrl,
      });
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectMongo(); // Connect to MongoDB

    // Create a new video
    const newVideo = await Video.create({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      controls: controls ?? true,
      transformation: {
        quality: quality ?? 100,
      },
    });
    if (!newVideo) {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }

    return NextResponse.json(newVideo, {
      message: "Video created successfully",
    });
  } catch (error) {
    console.error("Error creating video:", error);
    return NextResponse.json(
      { message: "Error while creating video. Try again" },
      { status: 500 }
    );
  }
}

// Functions, objects (date, error) and undefined are not json-serializable
