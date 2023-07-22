import { ThreadsAPI } from "threads-api";
import { ProfileHeader } from "@/components/Profile/ProfileHeader";
import { ProfileNav } from "@/components/Profile/ProfileNav";
import { PostFeed } from "@/components/Threads/PostFeed";
import { Suspense } from "react";
import { RateLimit } from "@/components/RateLimit";

const threadsAPI = new ThreadsAPI();

async function getUserId(username: string) {
  // console.log("getUserId");
  try {
    const userID = await threadsAPI.getUserIDfromUsername(username);
    if (!userID) return null;
    return userID;
  } catch (e) {
    return null;
  }
}

async function getUserData(userID: string) {
  try {
    const user = await threadsAPI.getUserProfile(userID);
    if (!user) return null;
    return user;
  } catch (e) {
    return null;
  }
}

async function getUserPosts(userID: string) {
  try {
    const posts = await threadsAPI.getUserProfileThreads(userID);
    if (!posts) return null;
    return posts;
  } catch (e) {
    return null;
  }
}

export default async function Page({
  params: { username },
}: {
  params: { username: string };
}) {
  const userID = await getUserId(username);

  if (!userID) return <RateLimit />;

  return (
    <>
      <div className={`max-w-[620px] flex flex-col justify-center m-auto`}>
        <Suspense fallback={<div>Loading Profile...</div>}>
          <UserProfile userID={userID} />
        </Suspense>
        <Suspense fallback={<div>Loading Posts...</div>}>
          <UserThreads userID={userID} />
        </Suspense>
      </div>
    </>
  );
}

async function UserProfile({ userID }: { userID: string }) {
  const user = await getUserData(userID);
  if (!user) return null;
  return (
    <>
      <ProfileHeader user={user} />
      <ProfileNav user={user} />
    </>
  );
}

async function UserThreads({ userID }: { userID: string }) {
  const posts = await getUserPosts(userID);
  if (!posts) return null;
  return <PostFeed posts={posts} />;
}
