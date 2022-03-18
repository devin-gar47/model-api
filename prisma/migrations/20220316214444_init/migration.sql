/*
  Warnings:

  - A unique constraint covering the columns `[ou]` on the table `testtable2` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "testtable2_ou_key" ON "testtable2"("ou");
