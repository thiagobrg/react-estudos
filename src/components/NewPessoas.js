import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { guilhermeApi } from "../services/guilhermeApi";

import "../styles/Pessoa.css";

function Pessoas() {
  const [pessoas, setPessoas] = useState([]);

  useEffect(buscarPessoas, []);

  function buscarPessoas() {
    guilhermeApi
      .get("/pessoas")
      .then((response) => setPessoas(response.data))
      .catch((error) => alert("Não foi possível obter os dados das pessoas"));
  }

  function handleDeletePessoa(pessoaId) {
    guilhermeApi
      .delete(`/pessoas/${pessoaId}`)
      .then((response) => buscarPessoas())
      .catch((error) => alert("Não foi possivel deletar essa pessoa da lista."));
  }

  const { register, handleSubmit } = useForm();

  function handleSalvar(data) {
    guilhermeApi
      .post("/pessoas", data)
      .then((response) => buscarPessoas())
      .catch((error) => alert("ERRO AO SALVAR NOVA PESSOA."));
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
        <form onSubmit={handleSubmit(handleSalvar)}>
          <input
            type="text"
            name="Nome"
            placeholder="Nome"
            {...register("nome")}
          />
          <input
            type="number"
            name="Idade"
            placeholder="Idade"
            {...register("idade")}
          />
          <input
            type="number"
            name="Telefone"
            placeholder="Telefone"
            {...register("telefone")}
          />
          <button type="submit">SALVAR</button>
        </form>
      </div>
    </div>
  );
}

export default Pessoas;
