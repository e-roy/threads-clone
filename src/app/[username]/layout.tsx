import { ThreadsAPI } from "threads-api";
import type { Metadata } from "next";
import { Suspense } from "react";
import { ProfileHeader } from "@/components/Profile/ProfileHeader";
import { ProfileNav } from "@/components/Profile/ProfileNav";
import { RateLimit } from "@/components/Messages";

const threadsAPI = new ThreadsAPI();

async function getUserId(username: string) {
  // console.log("getUserId LAYOUT");
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

export const metadata: Metadata = {
  title: "Threads Clone",
  description: "Threads Clone",
};

export default async function UserLayout({
  params: { username },
  children,
}: {
  params: { username: string };
  children: React.ReactNode;
}) {
  const userID = await getUserId(username);

  if (!userID) return <RateLimit />;

  return (
    <div
      className={`max-w-[620px] flex flex-col justify-center m-auto px-2 md:px-0`}
    >
      <Suspense fallback={<div>Loading Profile...</div>}>
        <UserProfile userID={userID} />
      </Suspense>
      {children}
    </div>
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
