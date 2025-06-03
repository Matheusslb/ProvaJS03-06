function configurar() {
  let validarTextoBtn = document.getElementById('validartextoBtn');
  let textoInput = document.getElementById('texto');

  //prettier-ignore
  if ((validarTextoBtn instanceof HTMLButtonElement) && (textoInput instanceof HTMLInputElement)
  ) {
    validarTextoBtn.addEventListener('click', () => {
      let texto = textoInput.value;
      validarTexto(texto);
      textoInput.value = '';
    });
  }
}

function validarTexto(texto) {
  try {
    //Array de objetos - pois o vetor contém múltiplos objetos.
    //prettier-ignore
    let validacoes = [
     { regex: /^.{1,70}$/, erro: 'O texto aceita apenas 70 caracteres.' },
    ];

    for (let validacao of validacoes) {
      let regex = validacao.regex;
      let erro = validacao.erro;
      if (!regex.test(texto)) {
        console.log(`Falha no regex: ${regex}`); // Debugar
        throw new Error(erro);
      }
    }

    exibirMensagem('texto válida!', 'green');
  } catch (erro) {
    exibirMensagem(erro.message, 'red');
  }
}

function exibirMensagem(mensagemValidacao, cor) {
  let mensagemTexto = document.getElementById('mensagemValidacao');

  if (mensagemTexto instanceof HTMLParagraphElement) {
    mensagemTexto.textContent = mensagemValidacao;
    mensagemTexto.style.color = cor;
  }
}

document.addEventListener('DOMContentLoaded', configurar);