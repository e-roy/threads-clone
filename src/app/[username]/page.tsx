import { ThreadsAPI } from "threads-api";
import { ProfileHeader } from "@/components/Profile/ProfileHeader";
import { ProfileNav } from "@/components/Profile/ProfileNav";
import { PostFeed } from "@/components/Threads/PostFeed";

const axiosOptions = {
  headers: {
    authority: "www.threads.net",
    "cache-control": "no-cache",
    origin: "https://www.threads.net",
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "accept-language": "ko,en;q=0.9,ko-KR;q=0.8,ja;q=0.7",
    pragma: "no-cache",
    referer: "https://www.instagram.com/",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": `navigate`,
    "sec-fetch-site": `cross-site`,
    "sec-fetch-user": `?1`,
    "upgrade-insecure-requests": `1`,
    "sec-ch-prefers-color-scheme": "dark",
    "sec-ch-ua":
      '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
    "sec-ch-ua-full-version-list": `"Not.A/Brand";v="8.0.0.0", "Chromium";v="114.0.5735.198", "Google Chrome";v="114.0.5735.198"'`,
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-ch-ua-platform-version": '"13.0.0"',
    "user-agent": `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36`,
    "viewport-width": `536`,
  },
};

async function getUser(username: string) {
  const threadsAPI = new ThreadsAPI();

  const userID = await threadsAPI.getUserIDfromUsername(username, axiosOptions);
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
