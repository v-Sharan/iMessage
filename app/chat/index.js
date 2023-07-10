import { useRouter } from "expo-router";
import { ChannelList } from "stream-chat-expo";
import { useAuth } from "../../context/store";

const ChatScreen = () => {
  const router = useRouter();
  const { user } = useAuth();

  const isPrivate = {
    type: "messaging",
    members: { $in: [user?._id] },
  };
  const isPublic = { type: "livestream" };

  return (
    <ChannelList
      filters={{ $or: [isPrivate, isPublic] }}
      onSelect={(channel) => router.push(`/chat/channel/${channel.id}`)}
    />
  );
};

export default ChatScreen;
