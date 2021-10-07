import UserListItem from "./UserListItem";

function UsersList() {

  const user = {
    name: "Thiago Guimarães",
    description: "Thiago tem 23 anos",
    link: "http://github.com/thiagobrg"
  };

  return (
    <section>
      <h1>Listagem de usuarios</h1>
      <ul>
        <UserListItem user={user}/>
        <UserListItem user={user}/>
        <UserListItem user={user}/>
        <UserListItem user={user}/>
        <UserListItem user={user}/>
      </ul>
    </section>
  );
}

export default UsersList;
