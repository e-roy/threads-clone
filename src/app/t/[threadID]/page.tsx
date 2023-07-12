import { Thread } from "react-threads";
import { Thread as ThreadPost, ThreadsAPI } from "threads-api";
const threadsAPI = new ThreadsAPI();

async function getData(threadID: string) {
  try {
    // const postID = await threadsAPI.getPostIDfromThreadID(threadID);
    // console.log("postID", postID);

    return null;
    // if (!postID) return null;
    // const thread = await threadsAPI.getThreads(postID);
    // if (!thread) return null;
    // const { containing_thread } = thread;

    // return containing_thread;
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
  const thread: ThreadPost | null = await getData(threadID);
  console.log("thread", thread);
  return null;
  // return <>{thread && <Thread thread={thread} />}</>;
}
