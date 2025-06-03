function configurar() {
  let btnCalcular = document.getElementById('calcularBtn');
  let inputData = document.getElementById('data');

  //prettier-ignore
  if ((btnCalcular instanceof HTMLButtonElement) && (inputData instanceof HTMLInputElement)){
      btnCalcular.addEventListener('click', () =>{
        calcularIdade();
      });
    }
}

function calcularIdade() {
  let inputData = document.getElementById('data');

  if(inputData instanceof HTMLInputElement){
    let data = inputData.value;
    console.log(data)
    let validacao = /^\d{2}\/\d{2}\/\d{4}$/;
    console.log(validacao)


    try {
      if (!validacao.test(data)) {
        throw new Error("use DD/MM/AAAA");
      }

    let partes = data.split('/');
    console.log(partes);

    let dia = parseInt(partes[0], 10);
    console.log(dia);

    let mes = parseInt(partes[1], 10) -1;
    console.log(mes);

    let ano = parseInt(partes[2], 10);
    console.log(ano);

    let dataNasc = new Date(ano, mes, dia);
    console.log(dataNasc)
    let atual = new Date();

    if (dataNasc > atual) {
      throw new Error("Data de nascimento invalida");
    }

    let idade = atual.getFullYear() - dataNasc.getFullYear();
    let mesAtual = atual.getMonth();
    let diaAtual = atual.getDay();

    if((mesAtual < mes) || (mesAtual == mes && diaAtual < dia)){
      idade--;
    }




    exibirResultado(idade);
    } catch (erro) {
      exibirResultado(erro.message);
    }
  }
}

function exibirResultado(mensagem) {
  let resultado = document.getElementById('resultado');

  if(resultado instanceof HTMLParagraphElement){
    resultado.textContent = mensagem;
  }
}


document.addEventListener('DOMContentLoaded', configurar);