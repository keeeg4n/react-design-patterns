"use client"

import PostCard from "@/components/PostCard/postcard";
import { Post } from "@/types/PostCard";
import { User } from "@/types/User";

const user: User = {
    id: 1,
    name: "User 1"
  }
  
  const post: Post = {
    id: 1,
    title: "This is a post title",
    content: "This is content of the post and here the stuff needs to be big",
    user: user
  }

export default function LogOffPage() {
    return (
        <PostCard
            post={post}
        >
            <PostCard.Main />
            <PostCard.ActionButtons />
        </PostCard>
    )
}