# Compound Pattern
## Problem Statement?
* A component in react is usually as mixture of smaller other componenets which act as individual items on their own. 
* Sometimes the components need to be shown separately in different pages.
* The parent componenet then requires props to conditionally render children components.
### Limitation
* One limitation (sending props for conditional rendering) for this kind of approach is the number of props that would be required would be huge. 
(there might be other limitations as well)

## Overcoming limitations using Compound Pattern
* One good ways to solve this problem is using `createContext` and `useContext` react hook.
* The `createContext` react hook will help us maintain the context across the different children components we create and to not allow the children components to be used else where other than it's one and only parent.
* The `useContext` hook helps use the use the context created in the previous step. And this we would be accessing the data in that way.
* The compound component pattern allows you to create components that all work together to perform a task.

## Implementation
* Let us assume our react component PostCard was built like this:
```typescript
export default function PostCard({post}: PostCardProps) {
    return (
        <div>
            <div>
                <h1>{post.title}</h1>
                <p>{post.content}</p>
            </div>
            <div>
                <span>{post.user.name}</span>
            </div>
            <div>
                <button>
                    Read More
                </button>
                <button>
                    Comment
                </button>
            </div>
        <div>
    )
}
```
* Assuming that PostCard need to be displayed differently in the differently in different contexts of the applications. Let's say we do not want to show the name of the user who has posted the post to someone who has not logged in. The code might look like this:
```typescript
export default function PostCard({isLoggedIn, post}: PostCardProps) {
    return (
        <div>
            <div>
                <h1>{post.title}</h1>
                <p>{post.content}</p>
            </div>
            {isLoggedIn && <div>
                <span>{post.user.name}</span>
            </div>}
            <div>
                <button>
                    Read More
                </button>
                <button>
                    Comment
                </button>
            </div>
        <div>
    )
}
```
* Now we see the problem is we would need to have all sort of the props for any conditional rendering. And sometimes the props might not give the appropriate result in the UI.
**Using Compound Pattern using Context API**
* Using the context API we can break the application this way:
```typescript
import {createContext, useContext} from "react";

type PostCardContext = {
    post: Post;
}

type PostCardProps = PropsWithChildren & {
    post: Post
}

// this is a function that is used to create context of the data we need.
const PostCardContext = createContext<PostCardContext | undefined>(undefined);

// This function is used to get the values from the context in this case this is the way we would get access to the post without passing the post around in props.
function usePostCardContext() {
    const context = useContext(PostCardContext);
    if (!context) {
        throw new Error("usePostCardContext must be used within the post card ")
    }
    return context;
}


function PostCard({ children, post }: PostCardProps) {
    return (
        <PostCardContext.Provider>
            <div>
                {children}
            </div>
        </PostCardContext.Provider>
    )
}

PostCard.Main = function PostCardMain() {
    const {post} = usePostCardContext();
    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>   
        </div> 
    )
}

PostCard.User = function PostCardUser() {
    const {post} = usePostCardContext();
    return (
        <span>{post.user.name}</span>
    )
}

PostCard.Buttons = function PostCardButtons() {
    return (
        <div>
            <button>Read More</button>
            <button>Comments</button>
        </div>
    )
}
```
* Now we have broken the component even further to allow us to use different ways of idk use?
* The way we would go about using this to display the details would be as such:
```typescript
import PostCard from "./Post";

export default function Home() {
  return (
    <div>
      <PostCard 
        post={post}
      >
        <PostCard.Main />
        <PostCard.User />
        <PostCard.ActionButtons />
      </PostCard>        
    </div>
  );
}
```
* Now in our problem we do not want just show the post user who is not logged in
```typescript
import PostCard from "./Post";

export default function Home() {
  return (
    <div>
      <PostCard 
        post={post}
      >
        <PostCard.Main />
        {isLoggedIn && <PostCard.User />}
        <PostCard.ActionButtons />
      </PostCard>        
    </div>
  );
}
```
* Now let's assume in another page we would only want to show the header and the content of the Post. We can approach it in this way
```typescript
export default function NotHome() {
  return (
    <div>
      <PostCard 
        post={post}
      >
        <PostCard.Main />
      </PostCard>        
    </div>
  );
}
```
## References
* [patterns.dev](https://www.patterns.dev/react/compound-pattern)
* [Youtube](https://www.youtube.com/watch?v=N_WgBU3S9W8)