/*
  Warnings:

  - A unique constraint covering the columns `[year,sport,home,division]` on the table `sportstable` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ou_year_sport_home_division_constraint";

-- CreateIndex
CREATE UNIQUE INDEX "ou_year_sport_home_division_constraint" ON "sportstable"("year", "sport", "home", "division");
