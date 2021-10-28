import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { guilhermeApi } from "../services/guilhermeApi";

import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';

import "../styles/Produtos.css"

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const schema = Yup.object({
    nome: Yup.string().required("Nome é um campo obrigatorio").label("Nome"),
    descricao: Yup.string().required("Descrição é um campo obrigatorio").label("Descrição"),
    preco: Yup.number().required("Preço é um campo obrigatorio").min(0.01, "O preço minimo deve ser de R$ 0.01").label("Preco").typeError('Preço deve ser um número valido')
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
  });


  useEffect(buscarProdutos, []);

  function buscarProdutos() {
    guilhermeApi
      .get("/produtos")
      .then((response) => setProdutos(response.data))
      .catch(() => alert("Não foi possivel buscar os produtos"));
  }

  function handleDelete(produtoId) {
    guilhermeApi
      .delete(`/produtos/${produtoId}`)
      .then(() => buscarProdutos())
      .catch(() => alert("Não foi possivel deletar o produto"));
  }

  function handleSave(data){
    guilhermeApi
      .post("/produtos", data)
      .catch(() => alert("Não foi possivel salvar o novo produto"));
  }

  return (
    <div>
      <h1>Listagem de Produtos</h1>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Preço</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr>
              <td>{produto.nome}</td>
              <td>{produto.descricao}</td>
              <td>
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(produto.preco)}
              </td>
              <td>
                <button type="button" onClick={() => handleDelete(produto.id)}>
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div id="cadastro-produto">
        <p>Adicionar novo produto</p>
        <form className="form-produtos" onSubmit={handleSubmit(handleSave)}>
          <div className="form-group">
            <input type="text" placeholder="Nome" {...register("nome")}/>
            <small>{formState?.errors?.nome?.message}</small>
          </div>
          <div className="form-group">
            <input type="text" placeholder="Descrição" {...register("descricao")}/>
            <small>{formState?.errors?.descricao?.message}</small>
          </div>
          <div className="form-group">
            <input type="number" placeholder="Preço" {...register("preco")}/>
            <small>{formState?.errors?.preco?.message}</small>
          </div>
          <button type="submit">SALVAR</button>
        </form>
      </div>
    </div>
  );
}

export default Produtos;
