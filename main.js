
/*

// Declaração de variáveis 
let cont = 0; // let pode ser reatribuído
const nome_sistema = "Gestão Clínica"; // const não pode ser reatribuído

// null e coalescência nula ??
let enderecoInvalido = null;
let enderecoValido = enderecoInvalido ?? "Endereço não informado";

// Conversão de tipo
let numeroStr = "42";
let numeroConvertido = Number(numeroStr); // string -> number

console.log(`Sistema: ${nome_sistema} | Exemplo de conversão: ${numeroStr} -> ${numeroConvertido}`);

*/

// Entidades
class Pessoa {
  constructor(id, nome, cpf) {
    this.id = id;
    this.nome = nome;
    this.cpf = cpf;
  }
}

class Paciente extends Pessoa {
  constructor(id, nome, cpf, telefone) {
    super(id, nome, cpf);
    this.telefone = telefone;
  }

  toString() {
    return `[Paciente] ID: ${this.id}, Nome: ${this.nome}, CPF: ${this.cpf}, Telefone: ${this.telefone}`;
  }
}

// Entidade Endereço
class Endereco {
  constructor(id, logradouro, bairro, cidade, cep) {
    this.id = id;
    this.logradouro = logradouro;
    this.bairro = bairro;
    this.cidade = cidade;
    this.cep = cep;
  }

  toString() {
    return `${this.logradouro}, ${this.bairro}, ${this.cidade} - CEP: ${this.cep}`;
  }
}

// Entidade Clínica
class Clinica {
  constructor(id, nome, endereco) {
    this.id = id;
    this.nome = nome;
    this.endereco = endereco; // relação 1:1 com Endereco
  }

  toString() {
    return `[Clínica] ${this.nome}, Endereço: ${this.endereco.toString()}`;
  }
}

// Entidade Especialização
class Especializacao {
  constructor(id, nome, descricao) {
    this.id = id;
    this.nome = nome;
    this.descricao = descricao;
  }

  toString() {
    return `[Especialização] ${this.nome} - ${this.descricao}`;
  }
}

// Entidade Médico (Pessoa)
class Medico extends Pessoa {
  constructor(id, nome, cpf, crm, especializacoes = []) {
    super(id, nome, cpf);
    this.crm = crm;
    this.especializacoes = especializacoes; // relação 1..N
  }

  adicionarEspecializacao(especializacao) {
    this.especializacoes.push(especializacao);
  }

  toString() {
    let especs = this.especializacoes.map(e => e.nome).join(", ");
    return `[Médico] ID: ${this.id}, Nome: ${this.nome}, CRM: ${this.crm}, Especializações: ${especs}`;
  }
}

// Entidade Consulta
class Consulta {
  constructor(id, medico, paciente, clinica, data, hora) {
    this.id = id;
    this.medico = medico;
    this.paciente = paciente;
    this.clinica = clinica;
    this.data = data;
    this.hora = hora;
  }

  toString() {
    return `[Consulta] Paciente: ${this.paciente.nome}, Médico: ${this.medico.nome}, Clínica: ${this.clinica.nome}, Data: ${this.data} ${this.hora}`;
  }
}


/* 

// --- Exemplo de uso ---
const endereco1 = new Endereco(1, "Rua A", "Centro", "Fortaleza", "60000-000");
const clinica1 = new Clinica(1, "Clínica Saúde", endereco1);

const espec1 = new Especializacao(1, "Cardiologia", "Cuida do coração");
const espec2 = new Especializacao(2, "Ortopedia", "Cuida dos ossos");

const medico1 = new Medico(1, "Dr. João", "12345678901", "CRM-CE1234");
medico1.adicionarEspecializacao(espec1);
medico1.adicionarEspecializacao(espec2);

const paciente1 = new Paciente(2, "Maria Silva", "98765432100", "85999998888");

const consulta1 = new Consulta(1, medico1, paciente1, clinica1, "2025-09-25", "14:30");

console.log(clinica1.toString());
console.log(medico1.toString());
console.log(paciente1.toString());
console.log(consulta1.toString());


// Objeto em notação literal
const especializacaoExemplo = {
  id: 1,
  nome: "Cardiologia",
  descricao: "Cuida do coração"
};

*/

// Sistema 
class Sistema {
  constructor() {
    this.pacientes = [];
  }

  carregarDadosIniciais() {
    console.log(">> Carregando lista inicial de pacientes...");
    this.pacientes.push(new Paciente(1, "Ana Gabrielle", "12345678901", "85988887777"));
    this.pacientes.push(new Paciente(2, "Brunno Luiz", "98765432100", "85999996666"));
  }

  listarPacientes() {
    console.log("\n--- Lista de Pacientes ---");
    // forEach com arrow function
    this.pacientes.forEach(p => console.log(p.toString()));
  }

  cadastrarPaciente = (paciente) => {
    // usando spread operator para copiar lista
    this.pacientes = [...this.pacientes, paciente];
    console.log(`\nPaciente ${paciente.nome} cadastrado com sucesso!`);
  };

  atualizarPaciente(id, { nome, cpf, telefone }) {
    // destructuring de objeto no parâmetro
    let paciente = this.pacientes.find(p => p.id === id);
    if (paciente) {
      paciente.nome = nome ?? paciente.nome;
      paciente.cpf = cpf ?? paciente.cpf;
      paciente.telefone = telefone ?? paciente.telefone;
      console.log(`\nPaciente ID ${id} atualizado com sucesso!`);
    } else {
      console.log("Paciente não encontrado.");
    }
  }

  removerPaciente = (id) => {
    this.pacientes = this.pacientes.filter(p => p.id !== id);
    console.log(`\nPaciente ID ${id} removido com sucesso!`);
  };

  ordenarPacientesPorNome() {
    // sort para ordenar objetos em array
    this.pacientes.sort((a, b) => a.nome.localeCompare(b.nome));
    console.log("\nPacientes ordenados por nome!");
  }

  menuDemo() {
    this.carregarDadosIniciais();
    this.listarPacientes();

    // Cadastra um novo paciente
    let novo = new Paciente(3, "Paulo Henrique", "11122233344", "85911112222");
    this.cadastrarPaciente(novo);
    this.listarPacientes();

    // Atualizar paciente (destructuring no parâmetro)
    this.atualizarPaciente(1, { nome: "Francisco Italo", telefone: "85970007777" });
    this.listarPacientes();

    // Ordena 
    this.ordenarPacientesPorNome();
    this.listarPacientes();

    // Remove
    this.removerPaciente(2);
    this.listarPacientes();
  }
}

//  Execução 
const sistema = new Sistema();
sistema.menuDemo();
