/*
  Warnings:

  - A unique constraint covering the columns `[year]` on the table `sportstable` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "sportstable_year_key" ON "sportstable"("year");
