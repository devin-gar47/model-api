/*
  Warnings:

  - A unique constraint covering the columns `[ou]` on the table `sportstable` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sportstable_ou_key" ON "sportstable"("ou");
