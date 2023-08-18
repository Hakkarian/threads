"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDb } from "../mongoose";
import Thread from "../models/thread.model";

interface Params {
  userId: string;
  username: string;
  name: string;
  bio: string;
  image: string;
  path: string;
}
export async function updateUser({
  userId,
  username,
  name,
  bio,
  image,
  path,
}: Params): Promise<void> {
  connectToDb();

  try {
    console.log("step 0");
    await User.findOneAndUpdate(
      {
        id: userId,
      },
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      { upsert: true }
    );
    console.log("step 1");
    if (path === "/profile/edit") {
      console.log("step 2");
      revalidatePath(path);
    }
    console.log("step 3");
  } catch (error: any) {
    throw new Error(`failed to create/update user:`, error.message);
  }
}

export async function fetchUser(userId: string) {
  try {
    connectToDb();

    return await User.findOne({ id: userId });
    // .populate({ path: 'communities', model: Community })
  } catch (error: any) {
    throw new Error("Failed to fetch user", error.message);
  }
}

export async function FetchuserPosts(userId: string) {
  try {
    connectToDb();

    // find all the threads, made by user with given userId
    const threads = User.findOne({ id: userId }).populate({
      path: "threads",
      model: Thread,
      populate: {
        path: "children",
        model: Thread,
        populate: {
          path: "author",
          model: User,
          select: "name image id",
        },
      },
    });
    return threads;
  } catch (error: any) {
    throw new Error("Failed to fetch user posts", error.message);
  }
}
