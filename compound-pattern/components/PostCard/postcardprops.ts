import { Post } from "@/types/PostCard"
import { PropsWithChildren } from "react"

export type PostCardProps = PropsWithChildren & {
    post: Post
}