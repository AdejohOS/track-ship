/*
  Warnings:

  - Added the required column `cost` to the `Shipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceType` to the `Shipment` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `carrier` on the `Shipment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Shipment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ShipmentStatus" AS ENUM ('pending', 'in_transit', 'out_for_delivery', 'delivered');

-- CreateEnum
CREATE TYPE "ServiceType" AS ENUM ('economy', 'standard', 'express', 'premium');

-- CreateEnum
CREATE TYPE "CarrierType" AS ENUM ('DHL', 'UPS', 'FedEx');

-- AlterTable
ALTER TABLE "Shipment" ADD COLUMN     "cost" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "serviceType" "ServiceType" NOT NULL,
DROP COLUMN "carrier",
ADD COLUMN     "carrier" "CarrierType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "ShipmentStatus" NOT NULL;

-- CreateTable
CREATE TABLE "ShipmentHistory" (
    "id" TEXT NOT NULL,
    "shipmentId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "notes" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShipmentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ShipmentHistory_shipmentId_idx" ON "ShipmentHistory"("shipmentId");

-- AddForeignKey
ALTER TABLE "ShipmentHistory" ADD CONSTRAINT "ShipmentHistory_shipmentId_fkey" FOREIGN KEY ("shipmentId") REFERENCES "Shipment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
