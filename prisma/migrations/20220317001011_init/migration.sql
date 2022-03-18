/*
  Warnings:

  - A unique constraint covering the columns `[year,sport,home,division]` on the table `testtable2` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "year_sport_home_division_constraint" ON "testtable2"("year", "sport", "home", "division");
