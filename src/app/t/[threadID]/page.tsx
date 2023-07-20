import { Thread, Thread as ThreadPost, ThreadsAPI } from "threads-api";
// import { thread } from "@/data/thread-post";
import { PostHeader } from "@/components/Post/PostHeader";

const threadsAPI = new ThreadsAPI();

async function getData(threadID: string) {
  try {
    const postID = await threadsAPI.getPostIDfromThreadID(threadID);

    if (!postID) return null;
    const thread = await threadsAPI.getThreads(postID);
    if (!thread) return null;

    return { thread };
  } catch (e) {
    console.log(e);
    return null;
  }
}

export default async function Page({
  params: { threadID },
}: {
  params: { threadID: string };
}) {
  const thread = await getData(threadID);

  if (!thread) return <div>404</div>;

  return (
    <div className={`max-w-[620px] flex flex-col justify-center m-auto`}>
      <PostHeader
        thread={thread.thread.containing_thread as unknown as Thread}
      />
    </div>
  );
}
