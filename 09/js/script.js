let alunos = []; // Lista de cadastrados
let alunosFiltrados = []; // Lista de filtrados

function configurar() {
  let validarBtn = document.getElementById('validarBtn');
  let nomeInput = document.getElementById('nome');
  let cpfInput = document.getElementById('cpf');
  let emailInput = document.getElementById('email');
  let telefoneInput = document.getElementById('telefone');
  let dataInput = document.getElementById("data");
  let btnCadastrar = document.getElementById("adicionarAluno")

  //prettier-ignore
  if ((validarBtn instanceof HTMLButtonElement) && (nomeInput instanceof HTMLInputElement) 
    && (cpfInput instanceof HTMLInputElement)&& (emailInput instanceof HTMLInputElement)&&
 (telefoneInput instanceof HTMLInputElement) && (dataInput instanceof HTMLInputElement) && 
 (btnCadastrar instanceof HTMLButtonElement)) {

  btnCadastrar.addEventListener("click", () => {
    let nome = nomeInput.value;  
    let cpf = nomeInput.value;  
    let email = emailInput.value; 
    let telefone = telefoneInput.value;
    let data = dataInput.value;


      if (nome && cpf && email && telefone && data) {
        alunos.push({ nome, cpf, email, telefone, data});
        nomeInput.value = '';
        cpfInput.value = '';
        emailInput.value = '';
        telefoneInput.value = '';
        dataInput.value = '';
        listarAlunos(alunos, 'listaAlunos');
      } else {
        alert('Preencha todos os campos corretamente.');
      }
  });


    
    validarBtn.addEventListener('click', () => {
      let nome = nomeInput.value;
      validarNome(nome);
    });
    validarBtn.addEventListener('click', () => {
    let cpf = cpfInput.value;
      validarCpf(cpf);
    });
    validarBtn.addEventListener('click', () => {
      let email = emailInput.value;
      validarEmail(email);
    });
    validarBtn.addEventListener('click', () => {
      let telefone = telefoneInput.value;
      validarTelefone(telefone);
    });
    validarBtn.addEventListener('click', () => {
      let data = dataInput.value;
      validarData(data);
    });
  }

  /*if(nome && !isNaN(cpf) && email && telefone && data){
    alunos.push({nome, cpf, email, telefone, data});

  }*/

  
  
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
    let dominiosPermitidos = ['gmail', 'hotmail', 'outlook'];
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

function listarAlunos(lista, tipo) {
  let listaAlunos = document.getElementById('listaAlunos');

  // Verifica se os elementos são do tipo esperado
  if (
    listaAlunos instanceof HTMLUListElement) {
    if (tipo === 'listaAlunos') {
      exibirConteudo(lista, listaAlunos); // Exibe a lista de produtos cadastrado
  }
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

function exibirConteudo(lista, listaElementos) {
  // Limpa a lista antes de exibir o conteúdo
  // listaElmentos.innerHTML = '';
  while (listaElementos.firstChild) {
    listaElementos.removeChild(listaElementos.firstChild);
  }

  // Adiciona os itens à lista
  lista.forEach((alunos) => {
    let aluno = document.createElement('li');
    aluno.textContent = `Nome: ${
      alunos.nome
    }, CPF: ${alunos.cpf}, Email: ${alunos.email}, Telefone: ${alunos.telefone}, Data de Nascimento: ${alunos.data}`;
    listaElementos.appendChild(aluno);
  });
}


function filtrarAlunos() {
  let filtroPorNomeInput = document.getElementById('filtroNome');

  //prettier-ignore
  if (filtroPorNomeInput instanceof HTMLInputElement) {
    let filtroPorNome = filtroPorNomeInput.value.toLowerCase();

    alunosFiltrados = alunos.filter((aluno) => {
      //prettier-ignore
      return ((filtroPorNome === '' || aluno.nome.toLowerCase().includes(filtroPorNome)));
    });

    listarAlunos(alunosFiltrados, 'listaFiltrados');
    filtroPorNomeInput.value = '';
  }
}

function removerAlunosFiltrados() {
  alunos = alunos.filter((aluno) => !alunosFiltrados.includes(aluno));
  alunosFiltrados = []; // Limpa a lista de filtrados após a remoção
  listarAlunos(alunos, 'listaAlunos');
  listarAlunos(alunosFiltrados, 'listaFiltrados');
}


document.addEventListener('DOMContentLoaded', configurar);