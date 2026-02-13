/*
    Lógica de Programação
     - Algoritmo
    
     Fluxo Básico:
      [x] Descobrir quando o botão foi clicado
      [x] Pegar o nome da cidade no imput
      [x] Enviar a cidade para o servidor
      [x] Pegar a resposta do servidor e colocar na tela

     Fluxo de Vóz:
      [x] Descobrir quando o botão foi clicado
      [x] Começar a ouvir e pegar a transcrição
      [x] Enviar a transcrição para o servidor
      [x] Pegar a resposta do servidor e colocar na tela

      Fluxo da IA:
      [x] Pegar os dados da cidade
      [x] Enviar os dados para a IA
      [x] Pegar a resposta da IA e colocar na tela
*/



async function buscar() {
    let cidade = document.querySelector(".input-cidade").value;
    let caixa = document.querySelector(".caixa-media")
    
    let respostaServidor = await fetch(`/api/weather?city=${cidade}`)
    let dadosJson = await respostaServidor.json()

    caixa.innerHTML = `
        <h2 class="cidade">${dadosJson.name}</h2>
        <p class="temp">${Math.floor(dadosJson.main.temp)} °C</p>
        <img class="icone" src="https://openweathermap.org/img/wn/${dadosJson.weather[0].icon}.png">
        <p class="umidade">Umidade: ${dadosJson.main.humidity}%</p>
        <button class="botao-ia" onclick="sugestaoRoupa()">Sugestão de Roupa</button>
        <p class="resposta-ia">Resposta da IA</p>
    
    `
console.log(dadosJson)

}

function detectaVoz() {
    let reconhecimento = new webkitSpeechRecognition()
    reconhecimento.lang = "pt-BR"
    reconhecimento.start()

    reconhecimento.onresult = function(evento) {
        let textTranscrito = evento.results[0][0].transcript
        document.querySelector(".input-cidade").value = textTranscrito
        buscar()
    }
}

async function sugestaoRoupa() {
let resposta = await fetch("/api/groq", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ temperatura, umidade, cidade })
});

let dados = await resposta.json(); // <-- aqui você pega o JSON

console.log(dados);

let texto = dados.resposta;

// Colocar na tela, por exemplo:
document.querySelector(".resposta-ia").textContent = texto;

return texto;
}




