import { ThreadsAPI } from "threads-api";
import { PostFeed } from "@/components/Threads/PostFeed";
import { Loading, MessageCard } from "@/components/Messages";
import { Suspense } from "react";

const threadsAPI = new ThreadsAPI();

async function getUserId(username: string) {
  // console.log("getUserId replies.tsx");
  try {
    const userID = await threadsAPI.getUserIDfromUsername(username);
    if (!userID) return null;
    return userID;
  } catch (e) {
    return null;
  }
}

async function getUserReplies(userID: string) {
  try {
    const posts = await threadsAPI.getUserProfileReplies(userID);
    if (!posts) return null;
    return posts;
  } catch (e) {
    return null;
  }
}

async function UserReplies({ userID }: { userID: string }) {
  const posts = await getUserReplies(userID);
  if (!posts || posts.length === 0)
    return <MessageCard message={`No replies yet.`} />;
  return <PostFeed posts={posts} />;
}

export default async function Page({
  params: { username },
}: {
  params: { username: string };
}) {
  const userID = await getUserId(username);

  if (!userID) return null;

  return (
    <>
      <Suspense fallback={<Loading />}>
        <UserReplies userID={userID} />
      </Suspense>
    </>
  );
}
