// PROMISES
// Nem tudo na programação é executado no mesmo momento que mandamos executar
// PROMISES = promesas de que algo vai acontecer ou vai dar errado no futuro

// .then/ .catch
// new Promises recebe dois parametros


const somaDoisNumeros = (a, b) => {           // primeiro crio uma arrowFunction

// resolve = função que chamo para avisar que deu certo / reject = função que chamo para avisar que deu errado

 return new Promise((resolve, reject)=>{           // para utilizar o promise, basta escrever new Promise(resolve, reject)
      setTimeout(()=>{                            // setTimeOut() serve para atrasar a função
        resolve(a + b);                           // jogo meu resolve com a função que eu quero
    }, 2000)                                      // quantidade de tempo para executar a function
      setTimeout(()=>{
        reject('Erro 404')
      }, 2000)                                     
  });
}
somaDoisNumeros(1, 3)                         // chamo a função normal, colocando os paramentros normalmente
.then(soma =>{                                // .then() = buscar o valor daquela soma e retorna resolvido
  console.log(soma)
})
.catch(err => {                              // .catch() = busca o valor e retorna o erro
  console.log(err)
}) 
.finally(()=>{                              // .finally() = Serve para finalizar a promise com alguma informação
  console.log(
    'A soma foi finalizadacom sucesso!'
  )
})                            

// quando eu jogar minha função somaDoisNumeros, estou fazendo uma promesa de que isso vai acontecer ou não em 2s


// EXEMPLO DO MUNDO REAL

// Quero buscar uma informação que está em outro servidor ( Utilizaremos a API fetch() do navegador )
// fetch() serve para disparar uma requisição HTTP

fetch('https://api.github.com/users/Matheussmaced') // caso coloque uma URL não existente, cairá no meu erro
.then(response => {                                 // Maneira mais organizada de usar o .then chamando uma API
  return response.json()
})
.then(body => {
  console.log(body)
})
.catch(err => {
  console.log(err)
})
.finally(()=>{
  setTimeout(()=>{
    console.log('Deu tudo certo!')
  }, 2000) 
})

//                                              Explicação .text() e json()
//.then(response => {
//  response.text().then(body => {    // .text medo que ele vai pegar qual foi o retorno da requisição e converter em texto
//    console.log(body);             // porém, o text também é uma promise
//  })                              // Poderia converter em json() para me retornar um objeto e não em texto
// })

 function buscaDadosNoGithub(){
  // fetch('https://api.github.com/users/Matheussmaced')
  // .then((gitHubAPI)=>{
  //   return gitHubAPI.json();
  // })
  // .then((body)=>{
  //   console.log(body)
  // })
  // .catch(err => {
  //   console.log(err)
  // })
  // .finally(()=>{
  //   setTimeout(()=>{
  //     console.log('Finalizou a busca!')
  //   }, 1000)
  // })
}

// OUTRAS FORMAS DE TRABALHAR COM ISSO
// VAMOS UTILIZAR ASYNC E AWAIT

// falo para o js que essa função é async 
// ela é uma função que ela tem algum código dentro dela que demora para executar (promise)

async function buscarDadosDoGithubAsync(){
  try {                                                                           // try{} serve como .then
    const gitHubAPI = await fetch('https://api.github.com/users/Matheussmaced');  // com await, a proxima linha de codigo só irá executar quando essa executar
    const body = await gitHubAPI.json()                                          // vai aguardar a promise gitHubAPI finalizar para ela entrar na prox linha de codigo

    console.log('Usando async e await', body)
    return body.name
  } catch(err) {                                                                // catch(){} seria o erro
    console.log(err)
  } finally{                                                                    // finalaly{} seria a mensagem final
    console.log('busca de dados concluída com sucesso')
  }
}

// quando utilizando a syntax de async await
// por padrão, toda função que utilizarmos essa async, ela automaticamente vira uma promise
// TODA FUNÇÃO async vira uma promise automaticamente.
// Não consigo guardar a função em variaveis

buscarDadosDoGithubAsync()

// para conseguir buscar oque foi retornado no try (body.name)
buscarDadosDoGithubAsync().then(name => {
  console.log(name)
})

