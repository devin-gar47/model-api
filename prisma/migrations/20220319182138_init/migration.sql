/*
  Warnings:

  - Added the required column `ifRoadMLOnePointFive` to the `testtable2` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "testtable2" ADD COLUMN     "ifRoadMLOnePointFive" VARCHAR(50) NOT NULL;
