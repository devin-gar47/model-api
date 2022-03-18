/*
  Warnings:

  - A unique constraint covering the columns `[ou,year,sport,home,division]` on the table `testtable2` will be added. If there are existing duplicate values, this will fail.
  - Made the column `division` on table `testtable2` required. This step will fail if there are existing NULL values in that column.
  - Made the column `home` on table `testtable2` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sport` on table `testtable2` required. This step will fail if there are existing NULL values in that column.
  - Made the column `year` on table `testtable2` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "testtable2" ALTER COLUMN "division" SET NOT NULL,
ALTER COLUMN "home" SET NOT NULL,
ALTER COLUMN "sport" SET NOT NULL,
ALTER COLUMN "year" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ou_year_sport_home_division_constraint" ON "testtable2"("ou", "year", "sport", "home", "division");
