"use server";

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

interface Params {
    userId: string,
    username: string,
    name: string,
    bio: string,
    image: string,
    path: string
}

export async function updateUser({
    userId,
    username,
    name,
    bio,
    image,
    path,
}: Params): Promise<void> {
    try {
        connectToDB();
        
        const result = await User.findOneAndUpdate(
            { id: userId },
            { username: username.toLowerCase(), name, image, bio, onboarded: true },
            { upsert: true }
        );        
        console.log("result", result) 
        if (path === "/profile/edit") {
            revalidatePath(path);
        }
    } catch (err: any) {
        throw new Error(`Failed to create/update user ${err.message}`);
    }
}

export async function fetchUser(userId: string) {
    try {
        connectToDB();
        return await User.findOne({ id: userId })
        // .populate({
        //     // path: "communites",
        //     // model: "Community"
        // });
    } catch (err: any) {
        throw new Error(`Failed to fetch user ${err.message}`)
    }
}
