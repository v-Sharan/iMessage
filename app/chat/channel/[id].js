import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import {
  Channel,
  MessageInput,
  MessageList,
  useChatContext,
} from "stream-chat-expo";

const ChannelScreen = () => {
  const [channel, setChannel] = useState(null);

  const { client } = useChatContext();

  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchChannel = async () => {
      const _id = typeof id === "string" ? id : id[0];
      const channels = await client.queryChannels({ id: { $eq: _id } });
      setChannel(channels[0]);
    };

    fetchChannel();
  }, [id]);

  if (!channel) {
    return <ActivityIndicator color={"#000"} />;
  }

  return (
    <Channel channel={channel}>
      <MessageList />
      <MessageInput />
    </Channel>
  );
};

export default ChannelScreen;
