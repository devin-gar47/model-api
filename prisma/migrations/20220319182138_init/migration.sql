/*
  Warnings:

  - Added the required column `ifRoadMLOnePointFive` to the `sportstable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sportstable" ADD COLUMN     "ifRoadMLOnePointFive" VARCHAR(50) NOT NULL;
