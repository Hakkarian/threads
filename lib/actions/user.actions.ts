"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDb } from "../mongoose";
import Thread from "../models/thread.model";
import { FilterQuery, SortOrder } from "mongoose";

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

export async function fetchUsers({
  userId,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: {
  userId: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
}) {
  try {
    connectToDb();

    const skipAmount = (pageNumber - 1) * pageSize;

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      id: { $ne: userId },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        {
          username: { $regex: regex },
        },
        { name: { $regex: regex } },
      ];
    }

    const sortOpts = { createdAt: sortBy };

    const usersQuery = User.find(query)
      .sort(sortOpts)
      .skip(skipAmount)
      .limit(pageSize);
    const totalUserAmount = await User.countDocuments(query);

    const users = await usersQuery.exec();

    const isNext = totalUserAmount > skipAmount + users.length;
    return { users, isNext };
  } catch (error: any) {
    throw new Error("Failed to fetch users", error.message);
  }
}

export async function getActivity(userId: string) {
  try {
    connectToDb();

    //find all threads created by the user

    const userThreads = await Thread.find({ author: userId });

    // collect all the child ids (replies) from the 'children'

    const childThreadIds = userThreads.reduce((acc, userThread) => {
      return acc.concat(userThread.children);
    }, []);
    const replies = await Thread.find({
      _id: { $in: childThreadIds },
      author: { $ne: userId },
    }).populate({ path: "author", model: User, select: "name image _id" });

    return replies;
  } catch (error: any) {
    throw new Error("Failed to fetch activity", error.message);
  }
}
