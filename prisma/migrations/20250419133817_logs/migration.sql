/*
  Warnings:

  - You are about to drop the column `moment` on the `dailyLog` table. All the data in the column will be lost.
  - Added the required column `dailyLogs` to the `dailyLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dailyLog" DROP COLUMN "moment",
ADD COLUMN     "dailyLogs" TEXT NOT NULL;
