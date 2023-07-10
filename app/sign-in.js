import {
  View,
  Text,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useAuth } from "../context/store";
import { StatusBar } from "expo-status-bar";

const index = () => {
  const { width, height } = useWindowDimensions();
  const { handleLogin, loading } = useAuth();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ccc",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          paddingVertical: 10,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          width: width - 35,
          height: height - 600,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 11,
          },
          shadowOpacity: 0.55,
          shadowRadius: 14.78,

          elevation: 10,
        }}
      >
        {loading && <ActivityIndicator color={"black"} size={"large"} />}
        {!loading && (
          <>
            <Text
              style={{
                padding: 10,
                fontWeight: "bold",
                fontSize: 25,
                color: "teal",
              }}
            >
              Welcome to Message App
            </Text>
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={handleLogin}
            />
          </>
        )}
      </View>

      <StatusBar style="inverted" backgroundColor="black" />
    </SafeAreaView>
  );
};

export default index;
