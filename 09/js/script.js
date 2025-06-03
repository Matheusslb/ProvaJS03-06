function configurar() {
  let validarBtn = document.getElementById('validarBtn');
  let nomeInput = document.getElementById('nome');
  let cpfInput = document.getElementById('cpf');
  let emailInput = document.getElementById('email');
  let telefoneInput = document.getElementById('telefone');
  let dataInput = document.getElementById("data");

  //prettier-ignore
  if ((validarBtn instanceof HTMLButtonElement) && (nomeInput instanceof HTMLInputElement) 
    && (cpfInput instanceof HTMLInputElement)&& (emailInput instanceof HTMLInputElement)&&
 (telefoneInput instanceof HTMLInputElement) && (dataInput instanceof HTMLInputElement)) {

    validarBtn.addEventListener('click', () => {
      const nome = nomeInput.value;
      validarNome(nome);
    });
    validarBtn.addEventListener('click', () => {
    const cpf = cpfInput.value;
      validarCpf(cpf);
    });
    validarBtn.addEventListener('click', () => {
      const email = emailInput.value;
      validarEmail(email);
    });
    validarBtn.addEventListener('click', () => {
      const telefone = telefoneInput.value;
      validarTelefone(telefone);
    });
    validarBtn.addEventListener('click', () => {
      const data = dataInput.value;
      validarData(data);
    });
  }
  
}

function validarNome(nomeStr) {
  try {
    let regex = /[^a-zA-ZÀ-ÿ \s]/g;
    
    if (regex.test(nomeStr)) {
      throw new Error(
        'O nome deve conter apenas letras e espaços entre o nome e sobrenome.'
      );
    }
    // Verifica se o nome tem pelo menos duas palavras
    if (nomeStr.trim().split(/\s+/).length < 2) {
      throw new Error(
        'O nome deve ter pelo menos duas palavras (nome e sobrenome).'
      );
    }
    exibirMensagemNome('Nome válido!', 'green');
  } catch (erro) {
    exibirMensagemNome(erro.message, 'red');
  }
}

function validarCpf(cpfStr) {
  try {
    let regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    //let regexCpf = /^\d{3}\d{3}\d{3}\d{2}$/;
    if (!regexCpf.test(cpfStr)) {
      throw new Error('O CPF deve seguir o formato 99.999.999-99.');
    }
    exibirMensagemCpf('CPF válido!', 'green', false);
  } catch (erro) {
    exibirMensagemCpf(erro.message, 'red', false);
  }
}
function validarEmail(email) {
  try {
    let regexEmail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;

    if (!regexEmail.test(email)) {
      throw new Error('O e-mail deve estar no formato "nome@dominio.com".');
    }

    // Verificar domínios e TLDs permitidos
    let dominiosPermitidos = ['gmail', 'hotmail', 'outlook', 'yahoo'];
    let tldsPermitidos = ['com', 'com.br', 'org'];

    let [_, dominioCompleto] = email.split('@');
    let dominio = dominioCompleto.split('.')[0];
    let tld = dominioCompleto.slice(dominio.length + 1);

    if (!dominiosPermitidos.includes(dominio)) {
      throw new Error(
        `O domínio "${dominio}" não é permitido. Domínios aceitos: ${dominiosPermitidos.join(
          ', '
        )}.`
      );
    }

    if (!tldsPermitidos.includes(tld)) {
      throw new Error(
        `O TLD "${tld}" não é permitido. TLDs aceitos: ${tldsPermitidos.join(
          ', '
        )}.`
      );
    }

    exibirMensagemEmail('E-mail válido!', true);
  } catch (erro) {
    exibirMensagemEmail(erro.message, false);
  }
}
function validarTelefone(telefone) {
  try {
    let regexTelefone =
      /^(?:\+55\s?)?(?:\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$|^\+55\s?\(?\d{2}\)?\s?\d{9}$/;
    if (!regexTelefone.test(telefone)) {
      throw new Error(
        'O número de telefone deve estar no formato +55 (16) 91234-5678 ou (16) 1234-5678 ou 119133-9779.'
      );
    }

    exibirMensagemTelefone('Número de telefone válido!', 'green');
  } catch (error) {
    exibirMensagemTelefone(error.message, 'red');
  }
}
function validarData(data) {
    try{

    
  let regexData = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regexData .test(data)) {
    throw new Error("Entrada inválida! Formato aceito - dd/mm/yyyy");
  }
  exibirMensagemData('data válido!', 'green');
  }catch (error) {
    exibirMensagemData(error.message, "red")
  }
  
}

function exibirMensagemNome(mensagem1, cor1) {
  let saida = document.getElementById('saidaNome');

  if (saida instanceof HTMLParagraphElement) {
    saida.textContent = mensagem1;
    saida.style.color = cor1;
  }
}
function exibirMensagemCpf(mensagem2, cor1, flag) {
  let identificarDocumento = flag ? true : false;
    let mensagemCpf = document.getElementById('saidaCpf');
    if (mensagemCpf instanceof HTMLParagraphElement) {
      mensagemCpf.textContent = mensagem2;
      mensagemCpf.style.color = cor1;
    }
  }

  function exibirMensagemEmail(mensagem1, sucesso) {
  let mensagemElemento = document.getElementById('saidaEmail');

  if (mensagemElemento instanceof HTMLParagraphElement) {
    mensagemElemento.textContent = mensagem1;
    mensagemElemento.style.color = sucesso ? 'green' : 'red';
  }
}
function exibirMensagemTelefone(texto, cor) {
  let mensagem = document.getElementById('saidaTelefone');
  if (mensagem instanceof HTMLParagraphElement) {
    mensagem.textContent = texto;
    mensagem.style.color = cor;
  }
}

function exibirMensagemData(texto1, cor2) {
  let mensagem = document.getElementById('saidaData');
  if (mensagem instanceof HTMLParagraphElement) {
    mensagem.textContent = texto1;
    mensagem.style.color = cor2;
  }
}

document.addEventListener('DOMContentLoaded', configurar);