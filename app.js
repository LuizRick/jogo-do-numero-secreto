let listaNumeroSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativa = 1;


function textoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

mensagemInicial();

function mensagemInicial(){
    textoNaTela('h1', 'Jogo do Número Secreto');
    textoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}`);
}



function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1)
    let quantidadeElementosNaLista = listaNumeroSorteados.length;
    
    if (quantidadeElementosNaLista == numeroLimite ){
        listaNumeroSorteados = [];
    }



    if (listaNumeroSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    }else {
        listaNumeroSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
 }

 function verificarChute(){
    let chute = document.querySelector('input').value;
    
    if (chute == numeroSecreto){
        textoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativa} ${palavraTentativa}!`;
        textoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else
        if (chute > numeroSecreto){
            textoNaTela('p', 'O número secreto é menor');
        }else{
            textoNaTela('p', 'O número secreto é maior');
        }
        //tentativa = tentativa + 1;
        tentativa++;
        limparCampo();
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativa = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

// limitando os números sorteados