# Conceitos Basicos de javascript

**Autor: Thiago Guimarães**<br>
**Criado em: 06/10/2021**<br>
<br>
Neste documento serão apresentados noções e conceitos de javascript.
<br>
## Tipos de dados
  - Number
    - Números no Javascript são representados pelo tipo Number.
    - Podem ter casas decimais ou não.
    - Abaixo vemos um exemplo:

    ```JS
    const idade = 28
    const pi = 3.14

    var a = 10
    var b = 0
    console.log(a/b) // Infinity

    var a = 0
    var b = 0
    console.log(a/b) // NaN
    ```
  
  - String
    - Todos os tipos texto, caracteres, pontuação.
    - Para criar basta usar "" ou '', serão considerados como string.
    - Combinação de "" ou '', quando é necessário usar uma citação é possível combinar os dois.
    
    ```JS
    const citacao = 'O Thiago falou "Oi"! ';
    ```

    - Para concatenar variáveis e texto existem 2 formas:
    

    ```JS
    const idade = 23;
    const frase = "Thiago tem " +idade+ " anos.";
    ```

    - Ou mais fácil usando Template String:
    

    ```JS
    const idade = 23;
    const frase = `Thiago tem ${idade} anos.`
    ```
  - Boolean 
    - Armazena valores true ou false.
    

    ```JS
    const testeFalso = false;
    const testeVerdadeiro = true;
    ```

## Tipos de variáveis

  - VAR
    - Primeira variável que surgiu no javascript.
    - Não tem escopo definido.
    - Problemas de declaração.
    

    ```JS
    const verdadeiro = true;

    if(verdadeiro){
      var frase = "Teste uma string bonita";
    }

    var frase;

    console.log(frase);
    ```
    - Como é possível ver acima o variável pode ser declarada em qualquer lugar.
    - Não tem um escopo, pode ser redeclarada, é uma bagunça.
      - Somente é recomendada para casos bem específicos.

  - LET
    - Usada para casos aonde os valores são mutaveis.
    - Tem escopo definido.
    

    ```JS
    const verdadeiro = true;

    if(verdadeiro){
      let frase = "Teste uma string bonita";
    }
    console.log(frase);
      ```

    - No teste acima o codigo da erro porque o escopo da variavel let só esta dentro do if
    

    ```JS
    const verdadeiro = true;
    let frase;

    if(verdadeiro){
      frase = "Teste uma string bonita";
    }

    console.log(frase);
    ```
  - CONST
    - Mesmo conceitos do tipo let, escopo bem definido.
    - Não pode ser reatribuida.
    

    ```JS
    const a = "Teste";
    a = "Teste 2"; // ERROR
    ```
    - Não pode ser iniciada depois:
    

    ```JS
    const a;
    a = "Teste 2"; // ERROR
    ```
    - Usando como um objeto:
    

    ```JS
    const objeto = {
      nome: "Thiago",
      idade: 23
    };

    console.log(objeto);

    objeto.nome = "Teste" // OK
    console.log(objeto);

    objeto = {nome: "Teste", idade: 01}; // ERROR
    ```
## Conceito de TRUTHY E FALSY

  - Existem valores no javascript, que são considerados como truthy ou falsy.
  - No exemplo a seguir e possivel verificar isso no caso de 0 e string vazia, esses valores serão considerados como falso.
  

    ```JS
    console.log( 0 == false);
    console.log( "" == false);
    ```
  - Logo esses valores podem ser utilizados como operadores de negação ou afirmação, por exemplo em um IF:
  

    ```JS
    const nome = "";

    if(nome){
      console.log(nome);
    }else{
      console.log("Insira um nome valido.");
    }

    const idade = 0;

    if(idade){
      console.log(idade);
    }else {
      console.log("Insira uma idade valida.");
    }
    ```

## Conversões

  - Os tipos dentro do javascript podem ser convertidos, caso possível.
  - Um valor numérico pode ser convertido para uma string.
  - Um valor em string caso seja um valor numérico valido pode ser convertido para number.
  - Nos casos onde existem comparações entre tipos o java script pode fazer essa conversão de forma implícita, como vamos ver no exemplo abaixo:

    ```JS
    const numero = 456;
    const numeroString = "456";

    // Neste caso o numero será convertido para string e a igualdade será comprovada
    console.log(numero == numeroString); // TRUE

    // Neste caso não há conversão, e como são tipos diferentes logo são diferentes.
    console.log(numero === numeroString); // FALSE
    ```

  - No primeiro caso é executado uma conversão implícita.
  - Essa conversão implícita pode ocorrer em outros casos, como na concatenação:
  

    ```JS
    // Converte o numero em String e concatena os dois valores.
    console.log(numero + numeroString);
    ```

  - Já no exemplo abaixo veremos um caso de conversão explicita.
  

    ```JS
    console.log(String(numero) + numeroString);
    console.log(numero + Number(numeroString));
    ```

## Operadores de Comparação

  - Dois iguais ==
    - Faz a comparação e faz a conversão implícitas.

  - Três iguais ===
    - Compara os valores e os tipos de dados.

  - Recomendado utilizar sempre o 3 iguais e caso necessário fazer a conversão de forma explicita.

  - O mesmo ocorre para a diferença.
    -  != (Faz a comparação e faz a conversão implícitas.)
    -  !== (Compara os valores e os tipos de dados.)

  - Operador ternario ?
    -  Como em outras linguagens de programação o JavaScript possui o operador ternario.

    ```JS
    const condicao = true
    console.log(condicao ? "VERDADEIRO" : "FALSO");
    ```

  - Operador ternario simplificado **MUITO USADO NO REACT**
    - Esse operador na verdade é a simplificação do ternario para casos aonde só possuem uma ação a ser executada.
    - No exemplo abaixo fica mais claro a utilização desse operador.

    ```JS
    const condicao = false;
    console.log(condicao && "FALSO");

    const condicao = true;
    console.log(condicao && "FALSO");
    ```

    - O que acontece na verdade caso a condição seja verdadeira retorna/executa o codigo seguinte.
    - No React é utilizado muitas vezes quando precisamos renderizar um codigo somente se uma condição for verdadeira.

    ```
      return (
        <div>
          {condicao && <h1>Esse H1 só será exibido caso a condição seja verdadeira.</h1>}
        <div>
      )
    ```

## Funções

  - São os métodos ou rotinas que tem que ser executadas, em determinado momento.
  - Existem 3 formas de declarar uma função em JavaScript.
  <br>
  - Forma mais simples:
  
  ```JS
    function imprimeTexto(texto){
      console.log(texto)
    }

    function soma(a,b){
      return a + b;
    }

    imprimeTexto("Hello World");
    imprimeTexto(soma(5,2));
    imprimeTexto(soma("Meu nome é ","Thiago"));
  ```
  <br>
  <br>

  - Como podemos ver acima no JavaScript não especificamos os tipos (Number, String) dos parâmetros.
  - Em uma função de somar dois valores, se passarmos duas strings elas serão concatenadas.
  
  <br>

  - Valores DEFAULT, quando declaramos uma função no javascript podemos especificar valores padrões caso não sejam passados nenhum valor.
  
  <br>

  ```JS
    function soma(a = 1, b = 1){
      return a + b;
    }
    console.log(soma());
    console.log(soma(5));
    console.log(soma(5,2));
  ```
  <br>

  - Segunda forma de declaração:
  <br>
  
  ```JS
  const soma = function(a,b) {return a + b }
  console.log(soma(1,2));
  ```

  - Principal diferença entre as duas declarações, Hoisting (Elevação).
  <br>
  <br>
  ```JS
  console.log(somarDoisValore(1,4));
  function somarDoisValore(a,b){
    return a + b
  }

  console.log(soma(1,2));
  const soma = function(a,b) {return a + b }
  ```
  <br>

  - No caso acima podemos ver um funcionamento do Javascript.
  - O interpretador do javascript na hora que está lendo o código verifica todas as funções e var e eleva para o todo do código antes de executar.
  - Logo na nossa primeira declaração o código funciona sem problemas, ja na segunda não, pois a função soma está sendo declarada como uma variável const que não será elevada.
  <br>
  <br>

  - Terceira forma de declaração, Arrow function:

  ```JS
  const imprimeTexto = texto => console.log(texto);
  const soma = (a, b) => a + b;

  imprimeTexto("123131 131");
  soma(5,5);

  const media = (a,b) => {
    const soma = a + b;
    return soma /2;
  }

  media(10,5);
  ```
  <br>

  - Arrow functions são geralmente funções mais simples que podem ser escritas em uma linha de código.

## Arrays
  
  - Array é uma estrutura de dados para armazenas uma sequencia de valores.
  - Declarando um array em JavaScript

  ```JS
  const array = [1,2,3,4];
  console.log(array);

  // Acessando uma posição especifica
  console.log(array[3]); // 4
  ```
  
  <br>

  - Os arrays possuem alguns métodos quem podem ser utilizados, abaixo exemplos:

  ```JS

  const array = [1,2,3,4];
  
  // Retorna a quantidade de itens do array
  console.log(array.length);

  // Adiciona um valor ao final do array
  array.push(5);
  console.log(array);

  // Removendo o ultimo elemento do array
  array.pop();
  console.log(array);


  // Outro exemplo de array usando objetos.
  const users = [{name: "ABC", id: 1, isAdmin: true}, 
                 {name: "DEF", id: 2, isAdmin: false}, 
                 {name: "GHI", id: 3, isAdmin: true}];

  // Percorrendo um array
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    console.log(user);
  }

  // Foreach
  for(let user of users){
    console.log(user);
  }

  // Método forEach
  users.forEach(user  => {
    console.log(user);
  });

  // Filtrando uma lista
  // O método filter recebe como parâmetro uma function que deve retornar true ou false.
  // Não altera a lista original, retorna uma nova lista.
  const adminUsers = users.filter(user => user.isAdmin);
  console.log(adminUsers);

  // "Mapeando" uma lista
  // O método map recebe como parâmetro uma função que deve retorna o novo valor.
  // Não altera a lista original, retorna uma nova lista.
  const mapeado = users.map((user) => {
    return {
      nome: user.name,
      identificador: user.id,
      ehSupervisor: user.isAdmin,
    };
  });
  console.log(mapeado);

  // Join 
  // Concatena os valores do array, e coloca entre eles o valor passado como parâmetro.
  const arrayDeNomes = users.map((user) => user.name);
  const nomesDosUsuarios = arrayDeNomes.join(", ");
  console.log(nomesDosUsuarios);
  ```
  <br>
  
  - De Todos os metodos vistos anteriormente, o mais utilizado no React é o map
  - Quando temos uma lista e precisamos renderizar alguma html na tela.
  - Exemplo:

  <br>

  ```JS

  function ListaDeUsuarios() {

    const users = [{name: "ABC", id: 1, isAdmin: true}, 
                 {name: "DEF", id: 2, isAdmin: false}, 
                 {name: "GHI", id: 3, isAdmin: true}];

    return (
      <div>
        <h1>Lista de Usuários</h1>
          <table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.isAdmin}</td>
                </tr>
              ))}
            </tbody>
        </table>
      </div>
    );
  ```

## Objetos

  - Os objetos em JavaScript são estruturas que representa chaves e valores.

  ```JS
  const pessoa = {
    nome: "Abcdef de ghif",
    idade: 15,
    genero: "não-binário",
    peso: 60,
    altura: 160,
  };

  // Acessando os valores de um objeto
  console.log(pessoa);
  console.log(`O nome da pessoa é ${pessoa.nome}`);
  console.log(`O nome da pessoa é ${pessoa["nome"]}`);
  
  const propriedade = "idade";
  console.log(`A idade da pessoa é ${pessoa[propriedade]}`);

  // Adicionando campos no nosso objeto
  pessoa.endereco = {
    rua: "Rua do endereco",
    numero: 777
  }

  console.log(`A pessoa mora na rua ${pessoa["endereco"]["rua"]}`);
  console.log(`A pessoa mora na rua ${pessoa["endereco"].rua}`);

  console.log(pessoa["chave_que_nao_existe"]);

  // Desestruturação de um objeto.
  const { idade } = pessoa;
  console.log(idade);

  ```


