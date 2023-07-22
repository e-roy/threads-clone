import { ThreadsAPI } from "threads-api";
import { ProfileHeader } from "@/components/Profile/ProfileHeader";
import { ProfileNav } from "@/components/Profile/ProfileNav";
import { PostFeed } from "@/components/Threads/PostFeed";

const threadsAPI = new ThreadsAPI();

async function getUser(username: string) {
  const userID = await threadsAPI.getUserIDfromUsername(username);
  if (!userID) {
    return;
  }

  try {
    const user = await threadsAPI.getUserProfile(userID);
    const replies = await threadsAPI.getUserProfileReplies(userID);
    return { user, replies };
  } catch (e) {
    console.log(e);
    return { user: null, replies: null };
  }

  // console.log("user ====>", JSON.stringify(user, null, 2));
  // console.log("posts ====>", JSON.stringify(posts, null, 2));
}

export default async function Page({
  params: { username },
}: {
  params: { username: string };
}) {
  const query = await getUser(username);
  const { user, replies } = query || {};

  // if (!user) return null;

  return (
    <>
      <div className={`max-w-[620px] flex flex-col justify-center m-auto`}>
        {user && (
          <>
            <ProfileHeader user={user} />
            <ProfileNav user={user} />
          </>
        )}
        {replies && <PostFeed posts={replies} />}
      </div>
    </>
  );
}
