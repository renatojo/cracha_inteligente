// Importa os dados das perguntas do arquivo static-data.js
import data from './static-data.js';

// ===============================
// AÇÃO: Habilitar botão de envio só se nome e setor forem válidos
// ===============================

const inputName = document.getElementById("name");
const selectSector = document.getElementById("sector");
const btnEnviar = document.getElementById("btnEnviarNomeSetor");

// Desativa o botão inicialmente
btnEnviar.disabled = true;

// Função que valida se pode ativar o botão
function validarCampos() {
    const nomeValido = inputName.value.trim() !== "";
    const setorValido = selectSector.value !== "";
    btnEnviar.disabled = !(nomeValido && setorValido);
}

// Escuta mudanças nos campos
inputName.addEventListener("input", validarCampos);
selectSector.addEventListener("change", validarCampos);

// ===============================
// AÇÃO: Enviar nome e setor
// ===============================

btnEnviar.addEventListener("click", (e) => {
    e.preventDefault(); // Evita o recarregamento da página ao clicar no botão

    // Obtém os valores
    const name = inputName.value;
    const sector = selectSector.value;

    // Exibe no crachá
    document.getElementById("divName").innerHTML = `<h2 class="name">${name}</h2>`;
    document.getElementById("divSector").innerHTML = `<h3 class="sector">${sector}</h3>`;

    // Remove o botão após envio
    btnEnviar.remove();

    // Ativa os botões de resposta
    document.getElementById("btnSim").disabled = false;
    document.getElementById("btnNao").disabled = false;
});

// ===============================
// VARIÁVEIS GLOBAIS
// ===============================

let QuestionNumber = 1;       // Controla o número da pergunta atual
const respostas = [];         // Armazena as respostas ("sim" ou "nao")

// ===============================
// AÇÃO: Botão "Sim"
// ===============================

document.getElementById("btnSim").addEventListener("click", (e) => {
    e.preventDefault();

    respostas.push("sim");

    if (QuestionNumber < data.NumberOfQuestions) {
        QuestionNumber++;
        atualizarPergunta();
    } else {
        mostrarResultado();
    }
});

// ===============================
// AÇÃO: Botão "Não"
// ===============================

document.getElementById("btnNao").addEventListener("click", (e) => {
    e.preventDefault();

    respostas.push("nao");

    if (QuestionNumber < data.NumberOfQuestions) {
        QuestionNumber++;
        atualizarPergunta();
    } else {
        mostrarResultado();
    }
});

// ===============================
// AÇÃO: Botão "Voltar"
// ===============================

document.getElementById("btnVoltar").addEventListener("click", (e) => {
    e.preventDefault();

    if (QuestionNumber > 1) {
        QuestionNumber--;
        respostas.pop();
        atualizarPergunta();
        console.log("Voltou para a pergunta:", QuestionNumber);
    }
});

// ===============================
// FUNÇÃO: Atualizar Pergunta
// ===============================

function atualizarPergunta() {
    if (QuestionNumber <= data.NumberOfQuestions) {
        const perguntaAtual = data.questions[QuestionNumber - 1];
        document.getElementById("title-box").innerHTML = perguntaAtual.title;
        document.getElementById("text-box").innerHTML = perguntaAtual.text;
        document.querySelector(".answer-options").style.display = "block";
    }
}

// ===============================
// FUNÇÃO: Mostrar Resultado Final
// ===============================

function mostrarResultado() {
    const totalSim = respostas.filter(r => r === "sim").length;

    const title = document.getElementById("title-box");
    const text = document.getElementById("text-box");

    document.querySelector(".answer-options").style.display = "none";

    if (totalSim >= 10) {
        const codigo = gerarCodigo();
        title.innerHTML = "Acesso Liberado";
        text.innerHTML = `Seu código de entrada é: <strong>${codigo}</strong>`;
    } else {
        title.innerHTML = "Acesso Negado";
        text.innerHTML = "Você não está apto para entrada hoje.";
    }
}

// ===============================
// FUNÇÃO: Gerar Código de Liberação
// ===============================

function gerarCodigo() {
    const numeroAleatorio = Math.floor(1000 + Math.random() * 9000);
    return `LIB-${numeroAleatorio}`;
}

// ===============================
// Exibir primeira pergunta ao carregar
// ===============================

atualizarPergunta();

// ===============================
// Desativar botões "Sim" e "Não" inicialmente
// ===============================

document.getElementById("btnSim").disabled = true;
document.getElementById("btnNao").disabled = true;
