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

  - Os tipos dentro do javascript podem ser convertidos, caso possivel.
  - Um valor numerico pode ser convertido para uma string.
  - Um valor em string caso seja um valor numerico valido pode ser convertido para number.
  - Nos casos onde existem comparações entre tipos o java script pode fazer essa conversão de forma implícida, como vamos ver no exemplo abaixo:

    ```JS
    const numero = 456;
    const numeroString = "456";

    // Neste caso o numero será convertido para string e a igualdade será comprovada
    console.log(numero == numeroString); // TRUE

    // Neste caso não há conversão, e como são tipos diferentes logo são diferentes.
    console.log(numero === numeroString); // FALSE
    ```

  - No primeiro caso é executado uma conversão implícita.
  - Essa conversão implicita pode ocorrer em outros casos, como na concatenação:
  

    ```JS
    // Converte o numero em String e concatena os dois valores.
    console.log(numero + numeroString);
    ```

  - Já no exemplo abaixo veremos um caso de conversão explicita.
  

    ```JS
    console.log(String(numero) + numeroString);
    console.log(numero + Number(numeroString));
    ```
