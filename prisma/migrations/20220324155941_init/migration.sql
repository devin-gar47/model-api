-- CreateTable
CREATE TABLE "sportstable" (
    "id" SERIAL NOT NULL,
    "ou" VARCHAR(10) NOT NULL,
    "year" INTEGER NOT NULL,
    "sport" VARCHAR(40) NOT NULL,
    "home" BOOLEAN NOT NULL,
    "division" BOOLEAN NOT NULL,
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
    "ifRoadMLOnePointFive" VARCHAR(50) NOT NULL,

    CONSTRAINT "sportstable_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL DEFAULT E'USER',
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(100) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sportstable_ou_year_sport_home_division_key" ON "sportstable"("ou", "year", "sport", "home", "division");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
