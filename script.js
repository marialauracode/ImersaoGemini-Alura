let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("header input");
let dados = [];

// informando que esta função é assíncrona

async function iniciarBusca() {
    // Se os dados ainda não foram carregados, busca do JSON.
    if (dados.length === 0) {
        try {
            let resposta = await fetch("data.json");
            dados = await resposta.json();
        } catch (erro) {
            console.error("Falha ao buscar os dados:", erro);
            return; // Interrompe a execução se houver erro
        }
    }

    const termoBusca = campoBusca.value.toLowerCase();
    const dadosFiltrados = dados.filter(dado =>
        dado.nome.toLowerCase().includes(termoBusca) ||
        dado.descricao.toLowerCase().includes(termoBusca) ||
        dado.autor.toLowerCase().includes(termoBusca)
    );

    renderizarCards(dadosFiltrados);
}

function renderizarCards(dados) {

    for (let dado of dados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.autor}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba mais</a>`

        // Adiciona um evento de clique ao card
        article.addEventListener("click", () => {
            // Limpa o campo de busca
            campoBusca.value = "";
        });

        cardContainer.appendChild(article);
    }
}

// Código para abrir os cards ao digitar no campo de busca
campoBusca.addEventListener("input", () => {
    // Limpa os cards existentes
    cardContainer.innerHTML = "";
    iniciarBusca();
});

// Código para carregar todos os cards ao carregar a página
window.addEventListener("load", () => {
    iniciarBusca();
});