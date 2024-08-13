import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Key } from "react";

const Page = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-in");
  const result = await fetchThreads(1, 20);
  return (
    <>
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {result && result.posts.length === 0 ? (
          <p>No threads found</p>
        ) : (
          <>
            {result &&
              result.posts.map(
                (post: {
                  _id: string;
                  parentId: string | null;
                  text: string;
                  author: { name: string; image: string; id: string };
                  community: { name: string; image: string; id: string } | null;
                  createdAt: string;
                  children: { author: { image: string } }[];
                }) => {
                  return (
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
                      isComment={false}
                    />
                  );
                }
              )}
          </>
        )}
      </section>
    </>
  );
};

export default Page;
