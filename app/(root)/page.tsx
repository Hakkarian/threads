import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";
import { fetchPosts, fetchThreadById } from "@/lib/actions/thread.actions";
import { ClerkProvider, UserButton, currentUser } from "@clerk/nextjs";
import { Router } from "next/router";
import { userInfo } from "os";

export default async function Home() {
  const res = await fetchPosts(1, 30);

  const user = await currentUser();

  console.log('likes fund', res)

  return (
    <>
      <h1 className="head-text text-left">Home</h1>

      <section className="mt-9 flex flex-col gap-10">
        {res.posts.length === 0 ? (
          <p className="no-result">No threads found</p>
        ) : (
          <ul className="flex flex-col gap-5">
            {res.posts.map((post) => (
              <ThreadCard
                key={post._id}
                  id={post._id}
                  currentUserId={user?.id || ""}
                  parentId={post.parentId}
                  content={post.text}
                  author={post.author}
                  community={post.community}
                  createdAt={post.createdAt}
                comments={post.children}
                likes={Number(post.favorite.length)}
                liked={post.liked}
                />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
