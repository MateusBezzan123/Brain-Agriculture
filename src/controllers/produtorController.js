const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) return false;

    var soma = 0;
    var resto;

    for (var i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (var i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;

    if ((resto == 10) || (resto == 11)) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return false;

    return true;
}

function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj.length !== 14) return false;

    if (/0{14}/.test(cnpj)) return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)) return false;

    return true;
}

exports.getAllProdutores = async (req, res) => {
    try {
        const produtores = await prisma.produtor.findMany();
        res.status(200).json(produtores);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getProdutorById = async (req, res) => {
    const { id } = req.params;

    try {
        const produtor = await prisma.produtor.findUnique({
            where: { id: id },
        });

        if (produtor) {
            res.status(200).json(produtor);
        } else {
            res.status(404).send('Produtor não encontrado.');
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.createProdutor = async (req, res) => {
    const documento = req.body.cpf_cnpj;
    const isValidCPF = validarCPF(documento);
    const isValidCNPJ = validarCNPJ(documento);

    if (!isValidCPF && !isValidCNPJ) {
        return res.status(400).send("CPF ou CNPJ inválido.");
    }

    const { areaTotalHectares, areaAgricultavelHectares, areaVegetacaoHectares } = req.body;
    if (areaAgricultavelHectares + areaVegetacaoHectares > areaTotalHectares) {
        return res.status(400).send("A soma das áreas não pode ultrapassar a área total da fazenda.");
    }

    try {
        const produtor = await prisma.produtor.create({
            data: {
                cpf_cnpj: documento,
                nome: req.body.nome,
                nomeFazenda: req.body.nomeFazenda,
                cidade: req.body.cidade,
                estado: req.body.estado,
                areaTotalHectares: req.body.areaTotalHectares,
                areaAgricultavelHectares: req.body.areaAgricultavelHectares,
                areaVegetacaoHectares: req.body.areaVegetacaoHectares
            }
        });
        res.status(201).json(produtor);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.updateProdutor = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    const documento = req.body.cpf_cnpj;
    const isValidCPF = validarCPF(documento);
    const isValidCNPJ = validarCNPJ(documento);

    if (!isValidCPF && !isValidCNPJ) {
        return res.status(400).send("CPF ou CNPJ inválido.");
    }

    try {
        const produtor = await prisma.produtor.update({
            where: { id: id },
            data: updateData,
        });
        res.status(200).json(produtor);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.deleteProdutor = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.produtor.delete({
            where: { id: id },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).send(error.message);
    }
};

exports.getFazendasPorEstado = async (req, res) => {
    try {
      const fazendasPorEstado = await prisma.produtor.groupBy({
        by: ['estado'], 
        _count: true, 
      });
  
      if (fazendasPorEstado.length === 0) {
        return res.status(404).json({ message: 'Nenhuma fazenda encontrada por estado.' });
      }

      const resultado = fazendasPorEstado.map(estado => ({
        estado: estado.estado,
        numeroDeFazendas: estado._count
      }));

      res.status(200).json(resultado);
    } catch (error) {
      console.error("Erro ao buscar fazendas por estado: ", error);
      res.status(500).send("Erro interno do servidor");
    }
  };
  