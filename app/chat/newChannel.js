import { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { getUsers } from "../../context/services";
import UserListItem from "../../components/UserListItem";

const NewChannel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <FlatList
      data={users}
      renderItem={({ item }) => <UserListItem user={item} />}
    />
  );
};

export default NewChannel;
