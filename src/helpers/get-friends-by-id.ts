import { fetchRedis } from "./redis";

export const getFriendsById = async (userId: string) => {
  // Retrieve friends for current user
  const friendIds = (await fetchRedis(
    "smembers",
    `user:${userId}:friends`
  )) as string[];

  // Retrieve friends' data
  const friends = await Promise.all(
    friendIds.map(async (friendId) => {
      const friend = (await fetchRedis("get", `user:${friendId}`)) as string;
      const parsedFriend = JSON.parse(friend) as User;

      return parsedFriend;
    })
  );

  return friends;
};
