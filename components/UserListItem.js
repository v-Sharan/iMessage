import { Text, Pressable } from "react-native";
import { useChatContext } from "stream-chat-expo";
import { useRouter } from "expo-router";
import { useAuth } from "../context/store";

const UserListItem = ({ user }) => {
  const { client } = useChatContext();
  const { user: me } = useAuth();
  const router = useRouter();

  let disabled = false;

  if (user._id === me._id) {
    disabled = true;
  }
  const startChannel = async () => {
    const channel = client.channel("messaging", {
      members: [user._id, me._id],
    });
    await channel.watch();

    router.push(`/chat/channel/${channel.id}`);
  };

  return (
    <Pressable
      onPress={startChannel}
      style={{
        backgroundColor: "#ccc",
        margin: 5,
        marginVertical: 3,
        padding: 10,
        borderRadius: 5,
      }}
      disabled={disabled}
    >
      <Text>{user.name}</Text>
    </Pressable>
  );
};

export default UserListItem;
