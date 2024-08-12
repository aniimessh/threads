"use server";

import { revalidatePath } from "next/cache";

import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    text: string;
    author: string;
    communityId: string | null;
    path: string;
}

export async function createThread({
    text,
    author,
    communityId,
    path,
}: Params) {
    try {
        connectToDB();
        const createThread = await Thread.create({
            text,
            author,
            community: null,
        });
        await User.findByIdAndUpdate(author, {
            $push: {
                threads: createThread._id,
            },
        });
        revalidatePath(path);
    } catch (err: any) {
        console.log(`Error while createing thread: ${err.message}`);
    }
}

export async function fetchThreads(pageNumber: 1, pagesize: 20) {
    try {
        connectToDB();
        const skipAmount = (pageNumber - 1) * pagesize;
        const postQuery = Thread.find({
            parentId: { $in: [null, undefined] },
        })
            .sort({ createdAt: "desc" })
            .skip(skipAmount)
            .limit(pagesize)
            .populate({ path: "author", model: "User" })
            .populate({
                path: "children",
                populate: { path: "author", model: "User", select: "_id name parentId image" },
            });

        const totalPostCount = await Thread.countDocuments({
            parentId: { $in: [null, undefined] },
        })
        const posts = await postQuery.exec();

        const isNext = totalPostCount > skipAmount + posts.length
        return { posts, isNext }
    } catch (err: any) {
        console.log(`Error while fetching threads: ${err.message}`);
    }
}
