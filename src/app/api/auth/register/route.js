import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import connectMongo from "@/lib/connect";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();
    console.log("Received data:", { name, email, password });
    if (
      [name, email, password].some(
        (field) => field == null || field.trim() === ""
      )
    ) {
      // if (!name || !email || !password)
      console.log("Missing fields:", { name, email, password });
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await connectMongo(); // Connect to MongoDB

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    // Create a new user
    const newUser = await User.create({ name, email, password });
    if (!newUser) {
      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Error while registering. Try again" },
      { status: 500 }
    );
  }
}
