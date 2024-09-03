/*
  Warnings:

  - You are about to drop the column `providerId_providerAccountId` on the `Account` table. All the data in the column will be lost.
  - Added the required column `provider_account_id` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Account" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "providerType" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpires" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Account" ("accessToken", "accessTokenExpires", "createdAt", "id", "providerId", "providerType", "refreshToken", "updatedAt", "userId") SELECT "accessToken", "accessTokenExpires", "createdAt", "id", "providerId", "providerType", "refreshToken", "updatedAt", "userId" FROM "Account";
DROP TABLE "Account";
ALTER TABLE "new_Account" RENAME TO "Account";
CREATE UNIQUE INDEX "Account_providerId_provider_account_id_key" ON "Account"("providerId", "provider_account_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
