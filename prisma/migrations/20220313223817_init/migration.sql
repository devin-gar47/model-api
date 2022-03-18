/*
  Warnings:

  - You are about to drop the `testtable` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "testtable";

-- CreateTable
CREATE TABLE "testtable2" (
    "id" SERIAL NOT NULL,
    "ou" VARCHAR(10) NOT NULL,
    "g1_fav_o2point5" VARCHAR(50) NOT NULL,
    "g1_fav_o1point5OR3point5" VARCHAR(50) NOT NULL,
    "g1_dog_o2point5" VARCHAR(50) NOT NULL,
    "g1_dog_o1point5OR3point5" VARCHAR(50) NOT NULL,
    "fav_o2point5" VARCHAR(50) NOT NULL,
    "fav_o1point5OR3point5" VARCHAR(50) NOT NULL,
    "dog_o2point5" VARCHAR(50) NOT NULL,
    "dog_o1point5OR3point5" VARCHAR(50) NOT NULL,
    "home_mlo2point5" VARCHAR(50) NOT NULL,
    "home_mlo3point5" VARCHAR(50) NOT NULL,

    CONSTRAINT "testtable2_pkey" PRIMARY KEY ("id")
);
