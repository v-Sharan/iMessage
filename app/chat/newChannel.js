import { useEffect, useState } from "react";
import { FlatList, ActivityIndicator } from "react-native";
import { getUsers } from "../../context/services";
import UserListItem from "../../components/UserListItem";

const NewChannel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((data) => setUsers(data.users))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {users.length > 0 && (
        <FlatList
          data={users}
          renderItem={({ item }) => <UserListItem user={item} />}
        />
      )}
      {loading && <ActivityIndicator color={"black"} size={"large"} />}
    </>
  );
};

export default NewChannel;
