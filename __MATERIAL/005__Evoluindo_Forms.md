
# Evoluindo Form e Iniciando com Roteamento
## Roteamento

  - Iremos agora criar as rotas da nossa aplicação
  - Nas aulas anteriores so tinhamos uma rota / e conforme iamos criando novos componentes iamos tirando e trocando o componente que estava sendo reenderizado no App.js
  - Hoje iremos instalar uma dependencia chamada react-router-dom, com ela iremos criar diferentes rotas para nossos componentes.
  
  <br>

  - 1º Passo: Adicionar a dependencia:

  ```
    yarn add react-router-dom
  ```

  - 2º Passo: Criar nosso arquivo de Rotas

    - Dentro da pasta src vamos criar um pasta chamada routes e dentro um arquivo Routes.js
    - Dentro desse arquivos vamos usar o seguinte codigo

    <br>

    ```JS
    import React from "react";
    import { BrowserRouter, Route, Switch } from "react-router-dom";

    import Layout from "../components/Layout";
    import Counter from "../components/Counter";
    import Pessoas from "../components/Pessoas";
    import RepositoriesList from "../components/RepositoriesList";
    import UsersList from "../components/UsersList";

    function Routes() {
      return (
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/counter" component={Counter} />
              <Route path="/pessoas" component={Pessoas} />
              <Route path="/repositories" component={RepositoriesList} />
              <Route path="/users" component={UsersList} />
              <Route path="*">
                <h1>Not found</h1>
              </Route>
            </Switch>
          </Layout>
        </BrowserRouter>
      );
    }

    export default Routes;
    ```

    - Nesse arquivos estamos mapeando nossas rotas
    - BrowserRouter: Indica o inicio de componentes monitorados usando as rotas (Contexto, explicar melhor quando tiver a aula de contexto)
    - Layout: Vamos ver mais para frente é so um componente que vai ter um html que vai ficar envolta da nossa aplicação
    - Switch: Indica que somente uma rota pode ser carregada.
    - Route: cada componente que vamos fazer registramos eles em um path e dizemos qual é o componente
    - Route path=*, caso não seja nenhum dos links acima escreve not found.

    <br>

  - 3º Layout - HTML que ficara sempre envolta do nosso app

    - Nosso arquivo de rotas esta indicando a falta do arquivo de Layout então vamos criar essa arquivo.
    - Dentro de components vamos criar um arquivo chamado Layout.js, e vamos colar o seguinte codigo

    ```JS
    import React from 'react';
    import { Link } from 'react-router-dom';
    import "../styles/Layout.css"

    function Layout({children}) {
      return (
        <div>
          <nav>
            <h1>Nosso App</h1>
            <Link to="/counter">Counter</Link>
            <Link to="/pessoas">Pessoas</Link>
            <Link to="/repositories">Repositories</Link>
            <Link to="/users">Users</Link>
          </nav>
          <main>{children}</main>
        </div>
      );
    }

    export default Layout;
    ```
    
    <br>

    - Precisamos também do css, dentro da pasta styles criar o arquivo Layout.css
    
    <br>

    ```CSS
    * {
      margin: 0;
    }

    nav {
      width: 100%;
      height: 50px;
      background-color: #141414;
      display: flex;
      align-items: center;
      color: #fff;
    }

    nav h1 {
      margin: 0 15px ;
    }

    nav a {
      color: inherit;
      text-decoration: none;
    }

    nav a:hover {
      text-decoration: underline;
    }

    nav > a + a {
      margin-left: 15px;
    }

    main {
      padding: 20px;
    }
    ```

## Evoluindo com Forms

  - Usando os novos ends points criados no projeto de estudos do spring
  - Vamos criar a listagem e form de cadastro para os Produtos

  <br>

  - 1º Passo: Criar o componente Produtos, dentro de components Produtos.js

  ```JS

  import React from 'react';

  function Produtos() {
    return <div />;
  }

  export default Produtos;
  ```

  <br>

  - 2º Passo: Adicionar esse componente no arquivo de Rotas e o Link para ele no Layout.

  ```HTML
  <Route path="/produtos" component={Produtos} />
  <Link to="/produtos">Produtos</Link>
  ```

  - 3º Passo: Usando o html abaixo criar as funcionalidades de listar e Deletar

  ```HTML
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
      <tbody></tbody>
    </table>
  </div>
  ```
  <br>

  - Resposta:
  
  <br>

  ```JS
  const [produtos, setProdutos] = useState([]);

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
    </div>
  );
  ```

  - 4º Passo: Criando o form para cadastro de um produto

    - Para começar vamos utlizar o seguinte html abaixo da nossa table

    <br>

    ```HTML
    <div id="cadastro">
      <p>Adicionar novo produto</p>
      <form>
        <input type="text" placeholder="Nome"/>
        <input type="text" placeholder="Descrição"/>
        <input type="number" placeholder="Preço"/>
        <button type="submit">SALVAR</button>
      </form>
    </div>
    ```

    <br>

    - Diferente da aula 004 não vamos manipular todos os valores do form na mão criando cada variavel.
    - Vamos utilizar um biblioteca que faz esse trabalho com muita facilidade.
    - Na verdade vamos adicionar 3 bibliotecas, 1 para trabalhar com o form e outras 2 para fazer as validações do form

    <br>

    ```
     yarn add react-hook-form @hookform/resolvers yup
    ```

    <br>

    - Apos adicionar vamos seguindo os passos para utilizar a biblioteca

    ```JS
    // importar
    import { useForm } from "react-hook-form";

    // Usar, vamos precisar a princio de 2 funcoes que são retornadas pelo useForm
    const { register, handleSubmit } = useForm();

    function handleSave(data){
      console.log(data);
    }


    <form onSubmit={handleSubmit(handleSave)}>

    <input type="text" placeholder="Nome" {...register("nome")}/>
    <input type="text" placeholder="Descrição" {...register("descricao")}/>
    <input type="number" placeholder="Preço" {...register("preco")}/>

    ```
    <br>

    - Pronto somente com isso ja temos total controle dos dados preenchidos no nosso form e ja podemos implementar nossa logica para enviar os dados para a api

    <br>

    ```JS


    const { register, handleSubmit, reset} = useForm();

     function handleSave(data){
      guilhermeApi
        .post("/produtos", data)
        .then(() => {
          reset();
          buscarProdutos();
        })
        .catch(() => alert("Não foi possivel salvar o novo produto"));
    }
    ```

    5º Passo: Vamos agora adicionar validações ao nosso form

      - Para isso vamos usar uma outra biblioteca que adicionamos o Yup.
      - Com o Yup conseguimos montar qual o schema que compoe o nosso form.
      - Qual o formato que esperamos que o nosso form esteja para enviarmos ele para a api.


      ```JS

      // Primeiro passo importar o Yup
      import * as Yup from "yup";

      // Segundo passo criar o schema do nosso form
       const schema = Yup.object({
        nome: Yup.string().required().label("Nome"),
        descricao: Yup.string().required().label("Descricao"),
        preco: Yup.number().required().min(0.01).label("Preco")
      });

      // Importar o Yup resolver (Servico que vai checar se o nosso form esta igual o nosso schema)
      import { yupResolver } from '@hookform/resolvers/yup';

      // Adicionar esses dois ao nosso form
      const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
      });
      ```

      - Quando terminamos de fazer todos esses passos acima
      - Vamos ver que nosso form quando tentamos enviar agora, nada acontece
      - Na verdade esta acontecendo o Yup esta validando e esta vendo que o form não esta preenchido conforme deveria
      - Mas para o usuario não esta ficando claro isso
      - Precisamos mostrar alguma mensagem para o usuario entender o que ele esta fazendo de errado.
      - Para isso vamos alterar um pouco o nosso html do cadatro para adicionar essas mensagens


      ```HTML
        <div id="cadastro-produto">
          <p>Adicionar novo produto</p>
          <form className="form-produtos" onSubmit={handleSubmit(handleSave)}>
            <div className="form-group">
              <input type="text" placeholder="Nome" {...register("nome")}/>
              <small>MENSAGEM DE ERRO VAI APARECER AQUI</small>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Descrição" {...register("descricao")}/>
              <small>MENSAGEM DE ERRO VAI APARECER AQUI</small>
            </div>
            <div className="form-group">
              <input type="number" placeholder="Preço" {...register("preco")}/>
              <small>MENSAGEM DE ERRO VAI APARECER AQUI</small>
            </div>
            <button type="submit">SALVAR</button>
          </form>
        </div>
      </div>
      ``` 

      <br>

      - Precisamos também criar um novo arquivo de css Produtos.css
      - Não esquecer de importar também

      ```JS
      import "../styles/Produtos.css"
      ```

      ```CSS
      #cadastro-produto {
        width: 50%;
      }

      #cadastro-produto p {
        font-size: 2rem;
        margin-top: 75px;
      }

      .form-produtos {
        display: flex;
      }

      .form-produtos .form-group {
        display: flex;
        flex-direction: column;

        margin-right: 4px;
        width: calc(25% - 4px);
      }

      .form-produtos > .form-group > input {
        padding: 12px 20px;
        height: 50px;

        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
      }

      .form-produtos > .form-group > small {
        color: red;
        margin-left: 15px;
        font-size: 10px;
      }

      .form-produtos >  button {
        padding: 12px 20px;
        height: 50px;

        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        width: calc(25% - 4px);
      }
      ```

     <br>

     - Agora que nosso HTML esta preparado para receber as mensagens de erro vamos ver de onde vem essas mensagens


      ```JS

      // Outro objeto que é retornado pela funcao useForm é o formState
      const { register, handleSubmit, formState } = useForm({
          resolver: yupResolver(schema),
      });

      // Dentro desse objeto temos nossas mensagens de erro então nos nossos small vamos substituir por isso
      <small>{formState.errors.nome.message}</small>

      // Porem caso não exista nenhum erro nossa varivel pode estar nula então precisamos tratar isso usando o operador ?
      // Este operador defini que caso o que esteja a esquerda esteja nulo não continue e retorna vazio
      <small>{formState?.errors?.nome?.message}</small>

      ```

      <br>

      - Com isso ao clicar em salvar vamos ver as mensagens de erro
      - Podemos customizar essas mensagens dessa forma.


      ```JS
      const schema = Yup.object({
        nome: Yup.string().required("Nome é um campo obrigatorio").label("Nome"),
        descricao: Yup.string().required("Descrição é um campo obrigatorio").label("Descrição"),
        preco: Yup.number().required("Preço é um campo obrigatorio").min(0.01, "O preço minimo deve ser de R$ 0.01").label("Preco").typeError('Preço deve ser um número valido')
      });
      ```

      - Required, Min, String e Number são pequenas validações que podem ser feitas com o Yup.
      - A biblioteca e bem completa e tem diversos metodos que podem ser utilizados.


  ## Referências

  - [React Router Dom](https://reactrouter.com/web/guides/quick-start)
  - [React Hook Form](https://react-hook-form.com/)
  - [Yup](https://github.com/jquense/yup)

