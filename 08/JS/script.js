const array = [];
function configurar() {
  let inserirBtn = document.getElementById('inserirBtn');
  let nomeInput = document.getElementById('nome');

  //prettier-ignore
 if ((inserirBtn instanceof HTMLButtonElement) && (nomeInput instanceof HTMLInputElement)
  ) {
    inserirBtn.addEventListener('click', () => {
      let nome = nomeInput.value;
      validarNome(nome);
    });
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function validarNome(nome) {
    
  try {
    let regex = /[^a-zA-ZÀ-ÿ \s]/g;

    if (regex.test(nome)) {
      throw new Error(
        'O nome deve conter apenas letras e espaços entre o nome e sobrenome.'
      );
    }
    // Verifica se o nome tem pelo menos duas palavras
    if (nome.trim().split(/\s+/).length < 2) {
      throw new Error(
        'O nome deve ter pelo menos duas palavras (nome e sobrenome).'
      );
    }
    if (nome) {
    // if (!array.includes(tarefa)
    if (array.includes(nome) === false) {
      array.push(nome);
      exibirMensagem('Nome valido');
      console.log(array.toString());
    } else {
      alert('O item já está na lista.');
    }

  } else {
    alert('Por favor, insira um valor válido.');
  }

  } catch (erro) {
    exibirMensagem(erro.message);
  }
  
}
function exibirMensagem(mensagem) {
  let saida = document.getElementById('saida');

  if (saida instanceof HTMLParagraphElement) {
    saida.textContent = mensagem;
  }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function sortear(){
    let number = array.length;
    Math.random(Number(number)); 
}

























function exibirSorteio() {
  //onde item nesse contexto é uma ul
  let item = document.getElementById('nome');

  if (item instanceof HTMLUListElement) {
    while (item.firstChild) {
      item.removeChild(item.firstChild);
    }

    array.forEach((valorAtualArray) => {
      // os itens 'li' da lista são criados de forma dinâmica
      let li = document.createElement('li');
      li.textContent = valorAtualArray;
      item.appendChild(li);
    });
  }
}

document.addEventListener('DOMContentLoaded', configurar);