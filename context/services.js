import { Alert } from "react-native";

const API_URL = "http://192.168.43.65:8080";

export const login = async (user) => {
  if (!user?.email && !user?.photoURL && !user?.displayName) {
    return;
  }

  const res = await fetch(`${API_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      name: user.displayName,
      userPhoto: user.photoURL,
    }),
  });

  if (!res.ok) {
    Alert.alert("Login unsuccessfull");
    return;
  }

  const data = await res.json();
  return data;
};

export const getUsers = async () => {
  const res = await fetch(`${API_URL}/user`);
  return res.json();
};
