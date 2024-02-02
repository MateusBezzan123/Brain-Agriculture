-- CreateTable
CREATE TABLE "Produtor" (
    "id" TEXT NOT NULL,
    "cpf_cnpj" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "nomeFazenda" TEXT,
    "cidade" TEXT,
    "estado" TEXT,
    "areaTotalHectares" DOUBLE PRECISION NOT NULL,
    "areaAgricultavelHectares" DOUBLE PRECISION NOT NULL,
    "areaVegetacaoHectares" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Produtor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cultura" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Cultura_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProdutorCultura" (
    "produtorId" TEXT NOT NULL,
    "culturaId" TEXT NOT NULL,

    CONSTRAINT "ProdutorCultura_pkey" PRIMARY KEY ("produtorId","culturaId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Produtor_cpf_cnpj_key" ON "Produtor"("cpf_cnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Cultura_nome_key" ON "Cultura"("nome");

-- AddForeignKey
ALTER TABLE "ProdutorCultura" ADD CONSTRAINT "ProdutorCultura_produtorId_fkey" FOREIGN KEY ("produtorId") REFERENCES "Produtor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProdutorCultura" ADD CONSTRAINT "ProdutorCultura_culturaId_fkey" FOREIGN KEY ("culturaId") REFERENCES "Cultura"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
