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
    return `[Clínica] ID: ${this.id}, Nome: ${this.nome}, Endereço: ${this.endereco.toString()}`;
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
    return `[Especialização] ID: ${this.id}, ${this.nome} - ${this.descricao}`;
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
    return `[Consulta] ID: ${this.id}, Paciente: ${this.paciente.nome}, Médico: ${this.medico.nome}, Clínica: ${this.clinica.nome}, Data: ${this.data} ${this.hora}`;
  }
}

// Sistema
class Sistema {
  constructor() {
    this.pacientes = [];
    this.medicos = [];
    this.clinicas = [];
    this.consultas = [];
    this.especializacoes = [];
    this.enderecos = [];
    this.proximoId = 1;
  }

  // Método para gerar um novo ID único
  gerarId() {
    return this.proximoId++;
  }

  carregarDadosIniciais() {
    console.log(">> Carregando dados iniciais do sistema...");

    const end1 = new Endereco(this.gerarId(), "Rua das Flores, 123", "Centro", "Fortaleza", "60000-001");
    const end2 = new Endereco(this.gerarId(), "Avenida Beira Mar, 456", "Meireles", "Fortaleza", "60165-121");
    this.enderecos.push(end1, end2);

    const cli1 = new Clinica(this.gerarId(), "Clínica Saúde & Bem-Estar", end1);
    const cli2 = new Clinica(this.gerarId(), "Clínica OrtoCenter", end2);
    this.clinicas.push(cli1, cli2);

    const esp1 = new Especializacao(this.gerarId(), "Cardiologia", "Cuidados com o coração.");
    const esp2 = new Especializacao(this.gerarId(), "Dermatologia", "Cuidados com a pele.");
    const esp3 = new Especializacao(this.gerarId(), "Ortopedia", "Tratamento de lesões e fraturas.");
    this.especializacoes.push(esp1, esp2, esp3);

    const pac1 = new Paciente(this.gerarId(), "Ana Gabrielle", "123.456.789-01", "85988887777");
    const pac2 = new Paciente(this.gerarId(), "Brunno Luiz", "987.654.321-00", "85999996666");
    this.pacientes.push(pac1, pac2);

    const med1 = new Medico(this.gerarId(), "Dr. Carlos Andrade", "111.222.333-44", "CRM-CE 1234", [esp1]);
    const med2 = new Medico(this.gerarId(), "Dra. Beatriz Lima", "222.333.444-55", "CRM-CE 5678", [esp2, esp3]);
    this.medicos.push(med1, med2);

    const con1 = new Consulta(this.gerarId(), med1, pac1, cli1, "2025-10-15", "09:30");
    const con2 = new Consulta(this.gerarId(), med2, pac2, cli2, "2025-10-16", "11:00");
    this.consultas.push(con1, con2);

    console.log(">> Dados carregados com sucesso!");
  }

  // --- Funções de Gerenciamento ---

  // <<< ALTERAÇÃO AQUI >>>
  // Função genérica para listar, usando forEach como solicitado.
  listarRegistros(lista, titulo) {
    console.log(`\n--- Lista de ${titulo} ---`);
    if (lista.length === 0) {
      console.log(`Nenhum registro encontrado.`);
      return;
    }
    lista.forEach(item => {
      console.log(item.toString());
    });
  }

  cadastrarPaciente = (paciente) => {
    this.pacientes = [...this.pacientes, paciente];
    console.log(`\n>> Paciente ${paciente.nome} cadastrado com sucesso!`);
  };

  atualizarPaciente(id, { nome, cpf, telefone }) {
    let paciente = this.pacientes.find(p => p.id === id);
    if (paciente) {
      paciente.nome = nome ?? paciente.nome;
      paciente.cpf = cpf ?? paciente.cpf;
      paciente.telefone = telefone ?? paciente.telefone;
      console.log(`\n>> Paciente ID ${id} atualizado com sucesso!`);
    } else {
      console.log(">> Paciente não encontrado.");
    }
  }

  removerPaciente = (id) => {
    this.pacientes = this.pacientes.filter(p => p.id !== id);
    console.log(`\n>> Paciente ID ${id} removido com sucesso!`);
  };

  ordenarPacientesPorNome() {
    this.pacientes.sort((a, b) => a.nome.localeCompare(b.nome));
    console.log("\n>> Pacientes ordenados por nome!");
  }

  // <<< ALTERAÇÃO AQUI >>>
  // Adição dos métodos de gerenciamento para as outras entidades.
  cadastrarMedico = (medico) => {
    this.medicos = [...this.medicos, medico];
    console.log(`\n>> Médico ${medico.nome} cadastrado com sucesso!`);
  };

  cadastrarConsulta = (consulta) => {
    this.consultas = [...this.consultas, consulta];
    console.log(`\n>> Consulta ID ${consulta.id} cadastrada com sucesso!`);
  };

  removerConsulta = (id) => {
    const tamanhoOriginal = this.consultas.length;
    this.consultas = this.consultas.filter(c => c.id !== id);
    if (this.consultas.length < tamanhoOriginal) {
      console.log(`\n>> Consulta ID ${id} removida com sucesso!`);
    } else {
      console.log(`\n>> Consulta ID ${id} não encontrada.`);
    }
  };

  // <<< ALTERAÇÃO AQUI >>>
  // Menu de demonstração completamente novo e integrado.
  menuDemo() {
    this.carregarDadosIniciais();

    console.log("\n==================== ESTADO INICIAL DO SISTEMA ====================");
    this.listarRegistros(this.clinicas, "Clínicas");
    this.listarRegistros(this.medicos, "Médicos");
    this.listarRegistros(this.pacientes, "Pacientes");
    this.listarRegistros(this.consultas, "Consultas");

    console.log("\n==================== OPERAÇÕES DE DEMONSTRAÇÃO ====================");

    // 1. Cadastrar um novo paciente
    console.log("\n--- 1. Cadastrando novo paciente ---");
    const novoPaciente = new Paciente(this.gerarId(), "Paulo Henrique", "111.222.333-44", "85911112222");
    this.cadastrarPaciente(novoPaciente);

    // 2. Cadastrar uma nova consulta, conectando entidades existentes
    console.log("\n--- 2. Cadastrando nova consulta ---");
    const pacienteExistente = this.pacientes[0]; // Ana Gabrielle
    const medicoExistente = this.medicos[1];     // Dra. Beatriz Lima
    const clinicaExistente = this.clinicas[1];   // Clínica OrtoCenter
    const novaConsulta = new Consulta(this.gerarId(), medicoExistente, pacienteExistente, clinicaExistente, "2025-11-10", "14:00");
    this.cadastrarConsulta(novaConsulta);

    // 3. Atualizar dados de um paciente
    console.log("\n--- 3. Atualizando Paciente ---");
    const dadosAtualizacao = { nome: "Ana Gabrielle Souza", telefone: "85970007777" };
    this.atualizarPaciente(pacienteExistente.id, dadosAtualizacao);

    // 4. Remover uma consulta pelo ID
    console.log("\n--- 4. Removendo uma consulta ---");
    const consultaParaRemoverId = this.consultas[0].id; // Remove a primeira consulta da lista
    this.removerConsulta(consultaParaRemoverId);

    // 5. Ordenar pacientes por nome
    console.log("\n--- 5. Ordenando pacientes por nome ---");
    this.ordenarPacientesPorNome();

    // 6. Demonstrar Desestruturação de Array (para o checklist)
    console.log("\n--- 6. Demonstração de Desestruturação de Array ---");
    const [primeiroMedico, segundoMedico] = this.medicos;
    console.log(`Primeiro médico da lista: ${primeiroMedico.nome}`);
    console.log(`Segundo médico da lista: ${segundoMedico.nome}`);


    console.log("\n==================== ESTADO FINAL DO SISTEMA ====================");
    this.listarRegistros(this.consultas, "Consultas (após cadastro e remoção)");
    this.listarRegistros(this.pacientes, "Pacientes (após cadastro, atualização e ordenação)");
  }
}

// Execução
const sistema = new Sistema();
sistema.menuDemo();