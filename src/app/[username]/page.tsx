import { ThreadsAPI } from "threads-api";
import { ProfileHeader } from "@/components/Profile/ProfileHeader";
import { ProfileNav } from "@/components/Profile/ProfileNav";
import { PostFeed } from "@/components/Threads/PostFeed";

async function getUser(username: string) {
  const threadsAPI = new ThreadsAPI();

  const userID = await threadsAPI.getUserIDfromUsername(username);
  if (!userID) {
    return;
  }
  const user = await threadsAPI.getUserProfile(username, userID);
  const posts = await threadsAPI.getUserProfileThreads(username, userID);
  return { userID, user, posts };
}

export default async function Page({
  params: { username },
}: {
  params: { username: string };
}) {
  const query = await getUser(username);
  const { userID, user, posts } = query || {};
  // console.log("posts", posts);

  if (!user) return null;

  return (
    <>
      <div className={`max-w-2xl flex flex-col justify-center m-auto`}>
        <ProfileHeader user={user} />
        <ProfileNav user={user} />
        {posts && <PostFeed posts={posts} />}
      </div>
    </>
  );
}
