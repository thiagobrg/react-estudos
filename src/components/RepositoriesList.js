import React, { useEffect, useState } from 'react';
import { api } from '../services/api';

function RepositoriesList() {
  const [respositories, setRepositories] = useState([]);
  const user = "thiagobrg";

  useEffect(() => {

    api.get(`/users/${user}/repos`)
    .then(response => setRepositories(response.data))
    .catch(error => {
      console.log("Aconteceu algo de errado na busca dos dados.")
      console.error(error);
    })
  }, [])


  return (
    <table>
      <thead>
        <tr>
          <th>Autor</th>
          <th>Repositorio</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        {respositories.map( repository => (
          <tr key={repository.id}>
            <td>{repository.owner.login}</td>
            <td>{repository.name}</td>
            <td>{repository.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RepositoriesList;