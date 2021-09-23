function UserListItem(props) {
  return (
    <li>
      <strong>{props.user.name}</strong>
      <p>{props.user.description}</p>
      <a href={props.user.link} target="_blank" rel="noreferrer">
        Acessar github
      </a>
    </li>
  );
}

export default UserListItem;
