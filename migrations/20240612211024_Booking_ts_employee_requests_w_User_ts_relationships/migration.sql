-- CreateTable
CREATE TABLE "_Booking_employee_requests" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Booking_employee_requests_AB_unique" ON "_Booking_employee_requests"("A", "B");

-- CreateIndex
CREATE INDEX "_Booking_employee_requests_B_index" ON "_Booking_employee_requests"("B");

-- AddForeignKey
ALTER TABLE "_Booking_employee_requests" ADD CONSTRAINT "_Booking_employee_requests_A_fkey" FOREIGN KEY ("A") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Booking_employee_requests" ADD CONSTRAINT "_Booking_employee_requests_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
