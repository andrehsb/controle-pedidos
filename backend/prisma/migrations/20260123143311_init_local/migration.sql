-- CreateTable
CREATE TABLE "Pedido" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "itens" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PREPARANDO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);
