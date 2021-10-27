# Recapitulação da aula passada.

- Alterações antes de iniciar nova aula

  - /services/api
    - Alterar nome desse arquivo para githubApi.js
    - Alterar objeto exportado para githubApi

  - /components/RepositoriesList
    - Aonde esta api alterar para githubApi

- Nesta aula vamos entender como fazer a manipulação de forms e fazer a 
  integração do nosso front end com o back-end que esta sendo construido pelo Guilherme


## 1º Passo - Criar un novo arquivo de Api com as configurações do servidor backend

  - Dentro de /services criar um arquivo guilhermeApi.js

  ```JS
  import axios from "axios";

  export const guilhermeApi = axios.create({
    baseURL: "https://localhost:8080/",
  })
  ```

## 2º Passo - criar o nosso componente que vai listar e cadastrar novas pessoas na api.

  - Dentro de /components, criar um novo componente Pessoas

  ```JS
  import React from 'react';

  function Pessoas() {
    return <div />;
  }

  export default Pessoas;
  ```

  - Vamos criar um html assim

  ```HTML
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
      </tbody>
    </table>
  </div>
  ```

  - Agora precisamos criar uma funcao para buscar os dados das pessoas, e uma variavel para armazenar esses dados
  - Desafio para eles criarem sozinhos (Igual o RepositoriesList usar como base).

  - Resposta:
  ```JS
  const [pessoas, setPessoas] = useState([]);

  useEffect(buscarPessoas, []);

  function buscarPessoas(){
    guilhermeApi.get("/pessoas")
    .then((response) => {
      setPessoas(response.data)
    })
    .catch((error) => {
      alert("Não foi possível obter os dados das pessoas");
    });
  }
  ```

  - Agora vamos exibir os dados das pessoas no html.
  - Lembrando que Pessoa tem esse formato:

  ```JS
  {
    id,
    nome,
    idade,
    telefone,
  }
  ```

  - Na coluna do action criar um botão com tipo button.

  ```JS
  {pessoas.map(pessoa => (
    <tr key={pessoa.id}>
      <td>{pessoa.nome}</td>
      <td>{pessoa.idade}</td>
      <td>{pessoa.telefone}</td>
      <td><button type="button">DELETAR</button></td>
    </tr>
  ))}
  ```

  - Para ficar mais bonito nosso codigo vamos usar um simples css
  - Criar um arquivo Pessoa.css dentro de styles
  - styles/Pessoa.css
  - Dentro do nosso Pessoas.js importar esse css
  - import "../styles/Pessoa.css"

  ```CSS
  table {
    font-family: Arial, Helvetica, sans-serif;
    border-collapse: collapse;
    width: 50%;
  }

  table thead tr th {
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04aa6d;
    color: white;
  }

  table td,
  table th {
    border: 1px solid #ddd;
    padding: 8px;
    width: 25%;
  }

  table tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  table tr:hover {
    background-color: #ddd;
  }

  #cadastro {
    width: 50%;
  }

  #cadastro p {
    font-size: 2rem;
    margin-top: 75px;
  }

  #cadastro form input,
  #cadastro form button {
    padding: 12px 20px;

    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;

    margin-right: 4px;
    width: calc(25% - 4px);
  }
  ```

  - Agora vamos fazer a funcionalidade para deletar uma pessoa na lista
  - Para isso criamos uma função que ira deletar os valores.

  ```JS
  function handleDeletePessoa(pessoaId){
    alert("Cliquei")
  }
  ```

  - E vamos usar essa funcao quando clicarmos no nosso button de deletar

  ```JS
  <td><button type="button" onClick={() =>handleDeletePessoa(pessoa.id)}>DELETAR</button></td>
  ```

  - Desafio criar a logica para deletar 

  ```JS
  function handleDeletePessoa(pessoaId){
    guilhermeApi.delete(`/pessoas/${pessoaId}`)
    .then((response) => buscarPessoas())
    .catch(error => {
      alert("Não foi possivel deletar essa pessoa da lista.")
    })
  }
  ```

  - Agora vamos adicionar uma nova pessoa na nossa lista.
  - Primeiro o html

  ```HTML
  <div id="cadastro">
    <p>Adicionar nova pessoa</p>
    <form>
      <input type="text" name="Nome" placeholder="Nome" required />
      <input type="number" name="Idade" placeholder="Idade" required />
      <input type="number" name="Telefone" placeholder="Telefone" required />
      <button type="submit">SALVAR</button>
    </form>
  </div>
  ```

  - Agora precisamos criar uma variaveis que vao ser os valores de cada input
  - Vamos usar uma variavel de estado para cada um deles


  ```JS
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [telefone, setTelefone] = useState("");

  value={nome}
  value={idade}
  value={telefone}
  ```
  
  - Podemos verificar agora que quando estamos digitando os valores não estão sendo inseridos como deferiam
  - Como estamos usando nossas variaveis como valor, conforme formos digitando precisamos alterar o valore dessas variaveis
  - Ou seja, pegar o input no teclado e adicionar na nossa variavel

  ```JS
  onChange={(event) => setNome(event.target.value)}
  onChange={(event) => setIdade(event.target.value)}
  onChange={(event) => setTelefone(event.target.value)}
  ```

  - E por ultimo precisar enviar nosso dados para o servidor para salvar.
  - Para isso criamos uma função salvar.

  ```JS
  function handleSalvar(event){
    event.preventDefault();

    const data = {
      nome,
      idade,
      telefone
    };

    guilhermeApi.post("/pessoas", data)
    .then((response) => buscarPessoas())
    .catch((error) => alert("ERRO AO SALVAR NOVA PESSOA."))
  }
  ```

  - Explicar a funcao, explicar o preventDefault()
  - Adicionar ao form a funcao

  ```HTML
  <form onSubmit={handleSalvar}>
  ```

  - Limpar o form depois de enviar os dados com sucesso

  ```JS
  guilhermeApi.post("/pessoas", data)
  .then((response) => {
    buscarPessoas()

    setNome("");
    setIdade("");
    setTelefone("");
  })
  .catch((error) => alert("ERRO AO SALVAR NOVA PESSOA."))
  ```