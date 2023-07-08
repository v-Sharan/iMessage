import { Slot } from "expo-router";
import { Provider } from "../context/store";

export default () => {
  return (
    // <Provider>
    <Slot />
    // </Provider>
  );
};
