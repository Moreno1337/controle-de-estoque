// VARIÁVEIS GLOBAIS

const botaoCadastrar = document.querySelector('#botaoCadastrar');
const inputProduto = document.querySelector('#produto');
const inputCadastro = document.querySelector('#cadastro');
const inputQuantidade = document.querySelector('#quantidade');
const tabela = document.querySelector('.tabela');

const mascara = document.querySelector('.mascara');

const divEntrada = document.querySelector('.entrada');
const botaoConcluirEntrada = document.querySelector('#botaoConcluirEntrada');
const inputEntrada = document.querySelector('#entrada');

const divSaida = document.querySelector('.saida');
const botaoConcluirSaida = document.querySelector('#botaoConcluirSaida');
const inputSaida = document.querySelector('#saida');

const divExcluir = document.querySelector('.excluir');
const divExcluirErro = document.querySelector('.excluir-erro');
const botaoSimExcluir = document.querySelector('#botaoSimExcluir');
const botaoNaoExcluir = document.querySelector('#botaoNaoExcluir');
const botaoErroExcluir = document.querySelector('#botaoErroExcluir');

// CADASTRO DE NOVO PRODUTO


botaoCadastrar.addEventListener('click', (event) => {

    event.preventDefault();
    
    let produto = inputProduto.value;
    let cadastro = inputCadastro.value;
    let quantidade = inputQuantidade.value;
    
    const div = document.createElement('div');
    div.classList.add('tabela__corpo');
    
    const template = `
    <span class="tabela__item" data-produto>${produto}</span>
    <span class="tabela__item" data-cadastro>${cadastro}</span>
    <span class="tabela__item" data-quantidade>${quantidade}</span>
    <button id="botaoEntrada" data-entrada="${produto}">Entrada</button>
    <button id="botaoSaida" data-saida="${produto}">Saída</button>
    <button id="botaoExcluir" data-excluir="${produto}">Excluir</button>
    `;
    div.innerHTML = template;
    
    tabela.appendChild(div);

    inputProduto.value = '';
    inputCadastro.value = '';
    inputQuantidade.value = '0';
    inputProduto.focus();

    lerBotoesDeEntrada();
    lerBotoesDeSaida();
    lerBotoesDeExcluir();
    
});


// ENTRADA NO ESTOQUE

let entradaSendoAtualizada;

lerBotoesDeEntrada();

botaoConcluirEntrada.addEventListener('click', () => {
    const quantidades = document.querySelectorAll('[data-quantidade]');

    const quantidadeDaEntrada = parseFloat(inputEntrada.value);
    quantidades.forEach( (quantidade) => {
        if(quantidade.parentNode.children[3].dataset.entrada === entradaSendoAtualizada) {
            const quantidadeAtual = parseFloat(quantidade.textContent);
            quantidade.textContent = quantidadeAtual + quantidadeDaEntrada;
        }
    });

    inputEntrada.value = 0;
    mascara.setAttribute('id', 'esconde');
    divEntrada.setAttribute('id', 'esconde');
});

function lerBotoesDeEntrada() {
    const botoesEntrada = document.querySelectorAll('#botaoEntrada');

    botoesEntrada.forEach( (botaoEntrada) => {
        botaoEntrada.addEventListener('click', (event) => {
            mascara.removeAttribute('id');
            divEntrada.removeAttribute('id');
            divEntrada.children[0].textContent = `Entrada de: ${event.target.dataset.entrada}`;
            inputEntrada.focus();
            entradaSendoAtualizada = event.target.dataset.entrada;
        });
    });
}

// SAÍDA DO ESTOQUE

let saidaSendoAtualizada;

lerBotoesDeSaida();

botaoConcluirSaida.addEventListener('click', () => {
    const quantidades = document.querySelectorAll('[data-quantidade]');

    const quantidadeDaSaida = parseFloat(inputSaida.value);
    quantidades.forEach( (quantidade) => {
        if(quantidade.parentNode.children[3].dataset.entrada === saidaSendoAtualizada) {
            const quantidadeAtual = parseFloat(quantidade.textContent);
            if(quantidadeAtual > 0 && quantidadeDaSaida <= quantidadeAtual) {
                quantidade.textContent = quantidadeAtual - quantidadeDaSaida;
            }
        }
    });

    inputSaida.value = 0;
    mascara.setAttribute('id', 'esconde');
    divSaida.setAttribute('id', 'esconde');
});

function lerBotoesDeSaida() {
    const botoesSaida = document.querySelectorAll('#botaoSaida');

    botoesSaida.forEach( (botaoSaida) => {
        botaoSaida.addEventListener('click', (event) => {
            mascara.removeAttribute('id');
            divSaida.removeAttribute('id');
            divSaida.children[0].textContent = `Saída de: ${event.target.dataset.saida}`;
            inputSaida.focus();
            saidaSendoAtualizada = event.target.dataset.saida;
        });
    });

}

// EXCLUIR PRODUTO DA LISTA DO ESTOQUE

let produtoSendoExcluido;

lerBotoesDeExcluir();

botaoNaoExcluir.addEventListener('click', () => {
    mascara.setAttribute('id', 'esconde');
    divExcluir.setAttribute('id', 'esconde');
});

botaoErroExcluir.addEventListener('click', () => {
    mascara.setAttribute('id', 'esconde');
    divExcluirErro.setAttribute('id', 'esconde');
});

botaoSimExcluir.addEventListener('click', () => {
    const produtos = document.querySelectorAll('[data-produto]');

    produtos.forEach( (produto) => {
        if(produto.textContent === produtoSendoExcluido) {
            produto.parentNode.remove();
        }
    });

    mascara.setAttribute('id', 'esconde');
    divExcluir.setAttribute('id', 'esconde');
});

function lerBotoesDeExcluir() {
    const botoesExcluir = document.querySelectorAll('#botaoExcluir');

    botoesExcluir.forEach( (botaoExcluir) => {
        botaoExcluir.addEventListener('click', (event) => {
            mascara.removeAttribute('id');

            if(event.target.parentNode.children[2].textContent == 0) {
                divExcluir.removeAttribute('id');
                divExcluir.children[0].textContent = `Você deseja remover "${event.target.dataset.excluir}" da lista de estoque?`;
                produtoSendoExcluido = event.target.dataset.excluir;
            } else {
                divExcluirErro.removeAttribute('id');
            }
        });
    });
}


// FILTRO DA BARRA DE PESQUISA

const inputPesquisa = document.querySelector('#inputPesquisa');

inputPesquisa.addEventListener('input', (event) => {
    const pesquisaValue = event.target.value.toLowerCase().trim();
    const produtos = document.querySelectorAll('[data-produto]')

    produtos.forEach( (produto) => {
        const visivel = produto.textContent.toLowerCase().trim().includes(pesquisaValue);
        if(visivel) {
            produto.parentNode.style.display = 'grid';
        } else {
            produto.parentNode.style.display = 'none'
        }
    });
});