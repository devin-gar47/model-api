/*
  Warnings:

  - A unique constraint covering the columns `[year,sport,home,division]` on the table `sportstable` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "year_sport_home_division_constraint" ON "sportstable"("year", "sport", "home", "division");
