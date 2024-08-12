import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreads } from "@/lib/actions/thread.action";
import { currentUser } from "@clerk/nextjs/server";

const Page = async () => {
  const user = await currentUser();
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
              result.posts.map((post) => {
                return (
                  <ThreadCard
                    key={post._id}
                    id={post._id}
                    currentUserId={user?.id || ""}
                    parentId={post.parentId}
                    content={post.text}
                    author={post.author}
                    communty={post.community}
                    createdAt={post.createdAt}
                    comments={post.children}
                    isComment={false}
                  />
                );
              })}
          </>
        )}
      </section>
    </>
  );
};

export default Page;
