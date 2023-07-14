import { Text, Pressable, Image } from "react-native";
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
        margin: 5,
        marginVertical: 3,
        padding: 10,
        borderRadius: 5,
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
      }}
      disabled={disabled}
    >
      <Image
        source={{ uri: user.userPhoto }}
        style={{ width: 50, height: 50, borderRadius: 50 }}
      />
      <Text style={{ fontSize: 25 }}>{user.name}</Text>
    </Pressable>
  );
};

export default UserListItem;
