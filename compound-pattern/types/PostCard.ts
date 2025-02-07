import { User } from "./User";

export type Post = {
    id: number,
    title: string,
    content: string,
    user: User
}