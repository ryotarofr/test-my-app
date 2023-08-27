-- CreateEnum
CREATE TYPE "EvaluationType" AS ENUM ('A', 'B', 'C', 'D', 'E');

-- CreateTable
CREATE TABLE "Naisei" (
    "id" SERIAL NOT NULL,
    "naisei" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "evaluation_type" "EvaluationType" NOT NULL,
    "createUser_id" INTEGER NOT NULL,

    CONSTRAINT "Naisei_pkey" PRIMARY KEY ("id")
);
