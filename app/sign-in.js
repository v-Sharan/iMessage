import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { useAuth } from "../context/store";
import { StatusBar } from "expo-status-bar";
import { Redirect } from "expo-router";

const index = () => {
  const { width } = useWindowDimensions();
  const { handleLogin, user } = useAuth();

  if (user) {
    return <Redirect href={"/"} />;
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
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
          width: width - 10,
          height: 125,
        }}
      >
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
      </View>
      <StatusBar style="inverted" backgroundColor="#fff" />
    </SafeAreaView>
  );
};

export default index;
