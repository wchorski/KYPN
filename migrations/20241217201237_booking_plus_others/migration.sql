/*
  Warnings:

  - You are about to drop the column `canSeeOtherUsers` on the `Role` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Role" DROP COLUMN "canSeeOtherUsers",
ADD COLUMN     "canCreateAvailability" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canManageAddons" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canManageAvailability" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canManageBookings" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canManageCart" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canManageCoupons" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canManageEvents" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canManageLocations" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canManageOrders" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canManageProducts" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canManageServices" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canManageSubscriptionItems" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canManageSubscriptionPlans" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canManageTickets" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canViewProducts" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canViewUsers" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "buisnessHourClosed" TEXT DEFAULT '18:00:00',
ADD COLUMN     "buisnessHourOpen" TEXT DEFAULT '09:00:00';

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "price" INTEGER NOT NULL DEFAULT 0,
    "service" TEXT,
    "location" TEXT,
    "customer" TEXT,
    "email" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "status" TEXT DEFAULT 'LEAD',
    "details" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "notes" TEXT NOT NULL DEFAULT '',
    "secretNotes" TEXT NOT NULL DEFAULT '',
    "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "google" JSONB DEFAULT '{"id":"","status":"","kind":"","htmlLink":""}',

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "rooms" INTEGER DEFAULT 1,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Availability" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3) NOT NULL,
    "employee" TEXT,
    "type" TEXT DEFAULT 'VACATION',
    "status" TEXT DEFAULT 'APPROVED',
    "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL DEFAULT '',
    "excerpt" TEXT NOT NULL DEFAULT '',
    "description" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "price" INTEGER DEFAULT 0,
    "durationInHours" DECIMAL(5,2) NOT NULL DEFAULT 6,
    "buisnessHourOpen" TEXT DEFAULT '09:00:00',
    "buisnessHourClosed" TEXT DEFAULT '18:00:00',
    "buisnessDays" JSONB NOT NULL DEFAULT '[0,1,2,3,4,5,6]',
    "status" TEXT DEFAULT 'DRAFT',
    "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Addon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL DEFAULT '',
    "test" TEXT NOT NULL DEFAULT '',
    "excerpt" TEXT NOT NULL DEFAULT '',
    "price" INTEGER DEFAULT 0,
    "stripeProductId" TEXT NOT NULL DEFAULT '',
    "status" TEXT DEFAULT 'AVAILABLE',
    "author" TEXT,
    "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Addon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Category_services" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Category_locations" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Booking_employees" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Booking_employee_requests" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Location_services" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Location_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Service_employees" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Service_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Addon_services" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Addon_bookings" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Addon_categories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Addon_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Booking_service_idx" ON "Booking"("service");

-- CreateIndex
CREATE INDEX "Booking_location_idx" ON "Booking"("location");

-- CreateIndex
CREATE INDEX "Booking_customer_idx" ON "Booking"("customer");

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Location_address_key" ON "Location"("address");

-- CreateIndex
CREATE INDEX "Availability_employee_idx" ON "Availability"("employee");

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Addon_name_key" ON "Addon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Addon_slug_key" ON "Addon"("slug");

-- CreateIndex
CREATE INDEX "Addon_author_idx" ON "Addon"("author");

-- CreateIndex
CREATE UNIQUE INDEX "_Category_services_AB_unique" ON "_Category_services"("A", "B");

-- CreateIndex
CREATE INDEX "_Category_services_B_index" ON "_Category_services"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Category_locations_AB_unique" ON "_Category_locations"("A", "B");

-- CreateIndex
CREATE INDEX "_Category_locations_B_index" ON "_Category_locations"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Booking_employees_AB_unique" ON "_Booking_employees"("A", "B");

-- CreateIndex
CREATE INDEX "_Booking_employees_B_index" ON "_Booking_employees"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Booking_employee_requests_AB_unique" ON "_Booking_employee_requests"("A", "B");

-- CreateIndex
CREATE INDEX "_Booking_employee_requests_B_index" ON "_Booking_employee_requests"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Location_services_AB_unique" ON "_Location_services"("A", "B");

-- CreateIndex
CREATE INDEX "_Location_services_B_index" ON "_Location_services"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Location_tags_AB_unique" ON "_Location_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Location_tags_B_index" ON "_Location_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Service_employees_AB_unique" ON "_Service_employees"("A", "B");

-- CreateIndex
CREATE INDEX "_Service_employees_B_index" ON "_Service_employees"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Service_tags_AB_unique" ON "_Service_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Service_tags_B_index" ON "_Service_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Addon_services_AB_unique" ON "_Addon_services"("A", "B");

-- CreateIndex
CREATE INDEX "_Addon_services_B_index" ON "_Addon_services"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Addon_bookings_AB_unique" ON "_Addon_bookings"("A", "B");

-- CreateIndex
CREATE INDEX "_Addon_bookings_B_index" ON "_Addon_bookings"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Addon_categories_AB_unique" ON "_Addon_categories"("A", "B");

-- CreateIndex
CREATE INDEX "_Addon_categories_B_index" ON "_Addon_categories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Addon_tags_AB_unique" ON "_Addon_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Addon_tags_B_index" ON "_Addon_tags"("B");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_service_fkey" FOREIGN KEY ("service") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_location_fkey" FOREIGN KEY ("location") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customer_fkey" FOREIGN KEY ("customer") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_employee_fkey" FOREIGN KEY ("employee") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Addon" ADD CONSTRAINT "Addon_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_services" ADD CONSTRAINT "_Category_services_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_services" ADD CONSTRAINT "_Category_services_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_locations" ADD CONSTRAINT "_Category_locations_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_locations" ADD CONSTRAINT "_Category_locations_B_fkey" FOREIGN KEY ("B") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Booking_employees" ADD CONSTRAINT "_Booking_employees_A_fkey" FOREIGN KEY ("A") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Booking_employees" ADD CONSTRAINT "_Booking_employees_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Booking_employee_requests" ADD CONSTRAINT "_Booking_employee_requests_A_fkey" FOREIGN KEY ("A") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Booking_employee_requests" ADD CONSTRAINT "_Booking_employee_requests_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Location_services" ADD CONSTRAINT "_Location_services_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Location_services" ADD CONSTRAINT "_Location_services_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Location_tags" ADD CONSTRAINT "_Location_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Location_tags" ADD CONSTRAINT "_Location_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Service_employees" ADD CONSTRAINT "_Service_employees_A_fkey" FOREIGN KEY ("A") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Service_employees" ADD CONSTRAINT "_Service_employees_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Service_tags" ADD CONSTRAINT "_Service_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Service_tags" ADD CONSTRAINT "_Service_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_services" ADD CONSTRAINT "_Addon_services_A_fkey" FOREIGN KEY ("A") REFERENCES "Addon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_services" ADD CONSTRAINT "_Addon_services_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_bookings" ADD CONSTRAINT "_Addon_bookings_A_fkey" FOREIGN KEY ("A") REFERENCES "Addon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_bookings" ADD CONSTRAINT "_Addon_bookings_B_fkey" FOREIGN KEY ("B") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_categories" ADD CONSTRAINT "_Addon_categories_A_fkey" FOREIGN KEY ("A") REFERENCES "Addon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_categories" ADD CONSTRAINT "_Addon_categories_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_tags" ADD CONSTRAINT "_Addon_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Addon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_tags" ADD CONSTRAINT "_Addon_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
