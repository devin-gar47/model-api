/*
  Warnings:

  - A unique constraint covering the columns `[year]` on the table `testtable2` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "testtable2_year_key" ON "testtable2"("year");
