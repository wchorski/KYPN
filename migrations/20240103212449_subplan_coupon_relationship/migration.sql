-- CreateTable
CREATE TABLE "_Coupon_subscriptionPlans" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Coupon_subscriptionPlans_AB_unique" ON "_Coupon_subscriptionPlans"("A", "B");

-- CreateIndex
CREATE INDEX "_Coupon_subscriptionPlans_B_index" ON "_Coupon_subscriptionPlans"("B");

-- AddForeignKey
ALTER TABLE "_Coupon_subscriptionPlans" ADD CONSTRAINT "_Coupon_subscriptionPlans_A_fkey" FOREIGN KEY ("A") REFERENCES "Coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Coupon_subscriptionPlans" ADD CONSTRAINT "_Coupon_subscriptionPlans_B_fkey" FOREIGN KEY ("B") REFERENCES "SubscriptionPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;
