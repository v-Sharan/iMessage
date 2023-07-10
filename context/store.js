import { useRouter, useNavigation } from "expo-router";
import React, { useState, useEffect } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { login } from "./services";

const AuthContext = React.createContext({
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
  loading: false,
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
  const router = useRouter();
  const [dataBaseUser, setDataBaseUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const rootNavigation = useNavigation();
  const [isNavigationReady, setNavigationReady] = useState(false);

  useEffect(() => {
    const unsubscribe = rootNavigation?.addListener("state", () =>
      setNavigationReady(true)
    );
    return () => unsubscribe && unsubscribe();
  }, [rootNavigation]);

  const loginUser = async (userData) => {
    setLoading(true);
    const data = await login(userData);
    setDataBaseUser(data);
    setLoading(false);
  };

  async function onAuthStateChanged(user) {
    setUser(user);
    if (user) {
      await loginUser(user);
    }
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (!isNavigationReady) {
      return;
    }
    setLoading(true);
    if (dataBaseUser) {
      setTimeout(() => {
        router.push("/chat");
      }, 1000);
    } else if (!dataBaseUser) {
      setTimeout(() => {
        router.push("/sign-in");
      }, 1000);
    }
    setLoading(false);
  }, [isNavigationReady, dataBaseUser, user]);

  const onGoogleButtonPress = async () => {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    setLoading(true);

    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    auth()
      .signInWithCredential(googleCredential)
      .then((data) => {
        setUser(data.user);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  const signOut = async () => {
    try {
      setDataBaseUser(null);
      setUser(null);
      await GoogleSignin.revokeAccess();
      await auth().signOut();
    } catch (err) {
      console.log(err);
    }
  };

  if (initializing) return null;

  return (
    <AuthContext.Provider
      value={{
        handleLogout: signOut,
        handleLogin: onGoogleButtonPress,
        user: dataBaseUser,
        loading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
