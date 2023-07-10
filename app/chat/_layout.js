import { Link, Stack } from "expo-router";
import { View } from "react-native";
import { useEffect } from "react";
import { StreamChat } from "stream-chat";
import { OverlayProvider, Chat } from "stream-chat-expo";
import { useAuth } from "../../context/store";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

const API_KEY = "jg9gc2gky5t5";
const client = StreamChat.getInstance(API_KEY);

export default function ChatLayout() {
  const { user, handleLogout } = useAuth();

  useEffect(() => {
    const connectUser = async () => {
      await client.connectUser(
        {
          id: user._id,
          name: user.name,
          image: user.userPhoto,
        },
        user.streamToken
      );
    };
    connectUser();

    return async () => {
      await client.disconnectUser();
    };
  }, []);

  return (
    <OverlayProvider>
      <Chat client={client}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              title: "Messages",
              headerRight: () => (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Link href="/chat/newChannel">
                    <Entypo name="new-message" size={24} color="royalblue" />
                  </Link>
                  <MaterialCommunityIcons
                    onPress={handleLogout}
                    name="logout"
                    size={24}
                    color="black"
                  />
                </View>
              ),
            }}
          />
          <Stack.Screen
            name="newChannel"
            options={{
              headerTitleAlign: "center",
              headerTitle: "Create a chat",
            }}
          />
          <Stack.Screen
            name="channel/[id]"
            options={{
              headerTitle: "Chat",
              headerTitleAlign: "center",
            }}
          />
        </Stack>
      </Chat>
    </OverlayProvider>
  );
}
