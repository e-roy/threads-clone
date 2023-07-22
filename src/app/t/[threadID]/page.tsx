import { Thread, ThreadsAPI } from "threads-api";
import { PostHeader } from "@/components/Post/PostHeader";
import { PostActions } from "@/components/Threads/PostActions";
import { PostFeed } from "@/components/Threads/PostFeed";
import { MessageCard, Loading } from "@/components/Messages";
import { Suspense } from "react";

const threadsAPI = new ThreadsAPI();

async function getData(threadID: string) {
  try {
    const postID = threadsAPI.getPostIDfromThreadID(threadID);

    if (!postID) return null;
    const thread = await threadsAPI.getThreads(postID);
    if (!thread) return null;

    return { ...thread };
  } catch (e) {
    // console.log(e);
    return null;
  }
}

export default async function Page({
  params: { threadID },
}: {
  params: { threadID: string };
}) {
  const thread = await getData(threadID);

  if (!thread) return <MessageCard message={`Thread Not Found`} />;

  const { containing_thread, reply_threads } = thread;
  const { post, view_replies_cta_string } = containing_thread.thread_items[0];

  return (
    <div className={`max-w-[620px] flex flex-col justify-center m-auto`}>
      <PostHeader thread={containing_thread as unknown as Thread} />
      <PostActions />
      <div className={`flex space-x-4 mt-2 text-zinc-400 dark:text-zinc-400`}>
        {view_replies_cta_string && (
          <div className={`hover:underline hover:cursor-pointer mb-4`}>
            {view_replies_cta_string}
          </div>
        )}
        {view_replies_cta_string && post.like_count > 0 && (
          <span className={``}>·</span>
        )}
        {post.like_count > 0 && (
          <div className={`hover:underline hover:cursor-pointer mb-4`}>
            {post.like_count} likes
          </div>
        )}
      </div>
      <div className={`border-b-2`} />
      <Suspense fallback={<Loading />}>
        {reply_threads && <PostFeed posts={reply_threads} />}
      </Suspense>
    </div>
  );
}
