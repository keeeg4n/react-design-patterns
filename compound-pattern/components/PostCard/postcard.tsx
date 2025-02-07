"use client"

import { Post } from "@/types/PostCard";
import { PostCardProps } from "./postcardprops";
import { createContext, useContext } from "react";

type PostCardContext = {
    post: Post
}

const PostCardContext = createContext<PostCardContext | undefined>(undefined);

function usePostCardContext() {
    const context = useContext(PostCardContext);
    if (!context) {
        throw new Error("usePostCardContext must be within the post card")
    }
    return context;
}

function PostCard({children, post} : PostCardProps) {
    return (
        <PostCardContext.Provider value={{ post }}>
            <div className="flex w-[300px] flex-col gap-2 rounded-md bg-neutral-800 p-2">
                {children}
            </div>
        </PostCardContext.Provider>
    )
}

PostCard.Main = function PostCardMain() {
    const {post} = usePostCardContext();
    return (
        <>
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p>{post.content}</p>
        </>
    )
}

PostCard.User = function PostCardUser() {
    const {post} = usePostCardContext();
    return (
        <p className="text-sm text-neutral-400">By: {post.user.name}</p>
    )
}

PostCard.ActionButtons = function PostCardButtons() {
    return (
        <div className="flex flex-row gap-2">
            <button>Read more</button>
            <button>Comments</button>
        </div>
    )
}

export default PostCard;
