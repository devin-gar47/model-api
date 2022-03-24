/*
  Warnings:

  - A unique constraint covering the columns `[ou,year,sport,home,division]` on the table `sportstable` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "sportstable_year_sport_home_division_key";

-- CreateIndex
CREATE UNIQUE INDEX "sportstable_ou_year_sport_home_division_key" ON "sportstable"("ou", "year", "sport", "home", "division");
