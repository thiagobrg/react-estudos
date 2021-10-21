import React, { useEffect, useState } from "react";
import { guilhermeApi } from "../services/guilhermeApi";

import "../styles/Pessoa.css";

function Pessoas() {
  const [pessoas, setPessoas] = useState([]);

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [telefone, setTelefone] = useState("");

  useEffect(buscarPessoas, []);

  function buscarPessoas() {
    guilhermeApi
      .get("/pessoas")
      .then((response) => {
        setPessoas(response.data);
      })
      .catch((error) => {
        alert("Não foi possível obter os dados das pessoas");
      });
  }

  function handleDeletePessoa(pessoaId) {
    guilhermeApi
      .delete(`/pessoas/${pessoaId}`)
      .then((response) => buscarPessoas())
      .catch((error) => {
        alert("Não foi possivel deletar essa pessoa da lista.");
      });
  }

  function handleSalvar(event){
    event.preventDefault();

    const data = {
      nome,
      idade,
      telefone
    };

    guilhermeApi.post("/pessoas", data)
    .then((response) => {
      buscarPessoas()

      setNome("");
      setIdade("");
      setTelefone("");
    })
    .catch((error) => alert("ERRO AO SALVAR NOVA PESSOA."))
  }

  return (
    <div>
      <h1>Listagem de Pessoas</h1>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Telefone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((pessoa) => (
            <tr key={pessoa.id}>
              <td>{pessoa.nome}</td>
              <td>{pessoa.idade}</td>
              <td>{pessoa.telefone}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleDeletePessoa(pessoa.id)}
                >
                  DELETAR
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="cadastro">
        <p>Adicionar nova pessoa</p>
        <form onSubmit={handleSalvar}>
          <input type="text" name="Nome" placeholder="Nome" required value={nome} onChange={(event) => setNome(event.target.value)}/>
          <input type="number" name="Idade" placeholder="Idade" required value={idade} onChange={(event) => setIdade(event.target.value)} />
          <input type="number" name="Telefone" placeholder="Telefone" required value={telefone} onChange={(event) => setTelefone(event.target.value)}/>
          <button type="submit">SALVAR</button>
        </form>
      </div>
    </div>
  );
}

export default Pessoas;
