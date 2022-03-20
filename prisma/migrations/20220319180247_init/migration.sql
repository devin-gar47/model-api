/*
  Warnings:

  - A unique constraint covering the columns `[ou,year,sport,home,division]` on the table `testtable2` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "testtable2_year_sport_home_division_key";

-- CreateIndex
CREATE UNIQUE INDEX "testtable2_ou_year_sport_home_division_key" ON "testtable2"("ou", "year", "sport", "home", "division");
