import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { login } from "./services";

const AuthContext = React.createContext({
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
});

export function useAuth() {
  return React.useContext(AuthContext);
}

export function Provider(props) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  GoogleSignin.configure({
    webClientId:
      "166675049971-b3tlbtmj3m3sr200opglf9bsflgb63qf.apps.googleusercontent.com",
  });
  const [dataBaseUser, setDataBaseUser] = useState(false);

  const loginUser = async (userData) => {
    await login(userData);
    setDataBaseUser(true);
  };

  function onAuthStateChanged(user) {
    setUser(user);
    const data = {
      email: user?.email,
      photoURL: user?.photoURL,
      displayName: user?.displayName,
    };
    loginUser(data);
    if (initializing) setInitializing(false);
  }
  const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    auth()
      .signInWithCredential(googleCredential)
      .then((data) => {
        loginUser(data.user);
        setUser(data.user);
      })
      .catch((err) => console.log(err));
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      setDataBaseUser(null);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (user && dataBaseUser) {
    setTimeout(() => {
      router.push("/");
    }, 50);
  } else if (!user && !dataBaseUser) {
    setTimeout(() => {
      router.push("/sign-in");
    }, 50);
  }

  return (
    <AuthContext.Provider
      value={{
        handleLogout: signOut,
        handleLogin: onGoogleButtonPress,
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
