-- AlterTable
ALTER TABLE "Investments" ADD COLUMN     "expiryAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Salary" ALTER COLUMN "expiryAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Wishlist" ADD COLUMN     "expiryAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Withdraw" ADD COLUMN     "expiryAt" TIMESTAMP(3);
