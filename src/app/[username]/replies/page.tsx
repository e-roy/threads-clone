import { ThreadsUser, ThreadsAPI } from "threads-api";
import { ProfileHeader } from "@/components/Profile/ProfileHeader";
import { ProfileNav } from "@/components/Profile/ProfileNav";
import { PostFeed } from "@/components/Threads/PostFeed";

// async function getUser(username: string) {
//   const threadsAPI = new ThreadsAPI();

//   // const username = "_junhoyeo";
//   const userID = await threadsAPI.getUserIDfromUsername(username);
//   if (!userID) {
//     return;
//   }
//   const user = await threadsAPI.getUserProfile(username, userID);
//   console.log(JSON.stringify(user));
//   return { userID, user };
// }

export default async function Page({
  params: { username },
}: {
  params: { username: string };
}) {
  // console.log("threadID", username);

  //   const query = await getUser(username);
  //   const { userID, user } = query || {};
  //   console.log("user", user);

  if (!user) return null;

  return (
    <>
      <div className={`max-w-2xl flex flex-col justify-center m-auto`}>
        <ProfileHeader user={user} />
        <ProfileNav user={user} />
      </div>
    </>
  );
}

const user = {
  is_private: false,
  profile_pic_url:
    "https://scontent.cdninstagram.com/v/t51.2885-19/358202847_614947594069692_3487562382200036996_n.jpg?stp=dst-jpg_s150x150&_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=rRDbF7DBOYkAX9OS4p1&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfBAzvDyYxIOD_VZiGKE3r8daaAhzDbvGQXJdvXu-YdBiA&oe=64B1DC28&_nc_sid=10d13b",
  username: "_junhoyeo",
  hd_profile_pic_versions: [
    {
      height: 320,
      url: "https://scontent.cdninstagram.com/v/t51.2885-19/358202847_614947594069692_3487562382200036996_n.jpg?stp=dst-jpg_s320x320&_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=rRDbF7DBOYkAX9OS4p1&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfDLq_Cx7SwsJR-6dMrpF-7MlXUtMH6ieTNvOp4AnD3Isw&oe=64B1DC28&_nc_sid=10d13b",
      width: 320,
    },
    {
      height: 640,
      url: "https://scontent.cdninstagram.com/v/t51.2885-19/358202847_614947594069692_3487562382200036996_n.jpg?stp=dst-jpg_s640x640&_nc_ht=scontent.cdninstagram.com&_nc_cat=100&_nc_ohc=rRDbF7DBOYkAX9OS4p1&edm=APs17CUBAAAA&ccb=7-5&oh=00_AfCsBR6jDAIDYbDhk18PxkU_4knaPhflPxLvkaDFiakNng&oe=64B1DC28&_nc_sid=10d13b",
      width: 640,
    },
  ],
  is_verified: false,
  biography:
    "🐰🏴‍☠️ generalist hacker, designer, dreamer.\n" +
    "making threads work in code ✌️",
  biography_with_entities: null,
  follower_count: 565,
  profile_context_facepile_users: null,
  bio_links: [{ url: "https://junho.io/about" }],
  pk: "5438123050",
  full_name: "Junho Yeo 🫧",
  id: null,
};
