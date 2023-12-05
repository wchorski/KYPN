-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "nameLast" TEXT NOT NULL DEFAULT '',
    "authId" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "password" TEXT NOT NULL DEFAULT '',
    "url" TEXT NOT NULL DEFAULT '',
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "stripeCustomerId" TEXT NOT NULL DEFAULT '',
    "buisnessHourOpen" TEXT DEFAULT '09:00:00',
    "buisnessHourClosed" TEXT DEFAULT '18:00:00',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "label" TEXT NOT NULL DEFAULT '',
    "canManageProducts" BOOLEAN NOT NULL DEFAULT false,
    "canReadProducts" BOOLEAN NOT NULL DEFAULT false,
    "canManageAddons" BOOLEAN NOT NULL DEFAULT false,
    "canManageBookings" BOOLEAN NOT NULL DEFAULT false,
    "canManageAvailability" BOOLEAN NOT NULL DEFAULT false,
    "canManageEvents" BOOLEAN NOT NULL DEFAULT false,
    "canManageAnnouncements" BOOLEAN NOT NULL DEFAULT false,
    "canManageTickets" BOOLEAN NOT NULL DEFAULT false,
    "canSeeOtherUsers" BOOLEAN NOT NULL DEFAULT false,
    "canManageUsers" BOOLEAN NOT NULL DEFAULT false,
    "canManageRoles" BOOLEAN NOT NULL DEFAULT false,
    "canManageCart" BOOLEAN NOT NULL DEFAULT false,
    "canManageOrders" BOOLEAN NOT NULL DEFAULT false,
    "canManageCategories" BOOLEAN NOT NULL DEFAULT false,
    "canManageTags" BOOLEAN NOT NULL DEFAULT false,
    "canManageLocations" BOOLEAN NOT NULL DEFAULT false,
    "canManagePages" BOOLEAN NOT NULL DEFAULT false,
    "canManagePosts" BOOLEAN NOT NULL DEFAULT false,
    "canManageServices" BOOLEAN NOT NULL DEFAULT false,
    "canManageSubscriptionPlans" BOOLEAN NOT NULL DEFAULT false,
    "canManageSubscriptionItems" BOOLEAN NOT NULL DEFAULT false,
    "canManageCoupons" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Announcement" (
    "id" TEXT NOT NULL,
    "link" TEXT NOT NULL DEFAULT '',
    "start" TIMESTAMP(3),
    "end" TIMESTAMP(3),
    "type" TEXT DEFAULT 'NORMAL',
    "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',

    CONSTRAINT "Announcement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3),
    "summary" TEXT NOT NULL DEFAULT '[NEW BOOKING]',
    "durationInHours" DECIMAL(5,2) NOT NULL DEFAULT 23,
    "service" TEXT,
    "location" TEXT,
    "price" INTEGER NOT NULL DEFAULT 0,
    "customer" TEXT,
    "email" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "name" TEXT NOT NULL DEFAULT '',
    "notes" TEXT NOT NULL DEFAULT '',
    "status" TEXT DEFAULT 'LEAD',
    "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "google" JSONB DEFAULT '{"id":"","status":"","kind":"","htmlLink":""}',

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "price" INTEGER DEFAULT 0,
    "durationInHours" DECIMAL(5,2) NOT NULL DEFAULT 6,
    "buisnessHourOpen" TEXT DEFAULT '09:00:00',
    "buisnessHourClosed" TEXT DEFAULT '18:00:00',
    "buisnessDays" JSONB NOT NULL DEFAULT '[0,1,2,3,4,5,6]',

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Addon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL DEFAULT '',
    "excerpt" TEXT NOT NULL DEFAULT '',
    "price" INTEGER DEFAULT 0,

    CONSTRAINT "Addon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Availability" (
    "id" TEXT NOT NULL,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3),
    "durationInHours" DECIMAL(5,2),
    "employee" TEXT,
    "type" TEXT DEFAULT 'VACATION',
    "status" TEXT DEFAULT 'APPROVED',
    "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',
    "author" TEXT,
    "name" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL DEFAULT '',
    "excerpt" TEXT NOT NULL DEFAULT '',
    "description" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "status" TEXT DEFAULT 'DRAFT',
    "price" INTEGER,
    "stripeProductId" TEXT NOT NULL DEFAULT 'NO_PROD_ID',
    "stripePriceId" TEXT NOT NULL DEFAULT 'NO_PRICE_ID',
    "billing_interval" TEXT DEFAULT 'month',
    "stockMax" INTEGER NOT NULL DEFAULT 0,
    "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionItem" (
    "id" TEXT NOT NULL,
    "custom_price" INTEGER,
    "subscriptionPlan" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDelinquent" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT DEFAULT 'ACTIVE',
    "billing_interval" TEXT NOT NULL DEFAULT 'month',
    "notes" TEXT NOT NULL DEFAULT '',
    "user" TEXT,
    "stripeChargeId" TEXT NOT NULL DEFAULT '',
    "stripeSubscriptionId" TEXT NOT NULL DEFAULT '',
    "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubscriptionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL DEFAULT 'undefined/assets/private/placeholder.png',
    "name" TEXT NOT NULL DEFAULT '',
    "stripeProductId" TEXT NOT NULL DEFAULT 'NO_PROD_ID',
    "stripePriceId" TEXT NOT NULL DEFAULT 'NO_PRICE_ID',
    "slug" TEXT NOT NULL DEFAULT '',
    "excerpt" TEXT NOT NULL DEFAULT '',
    "description" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "status" TEXT DEFAULT 'DRAFT',
    "price" INTEGER,
    "stockCount" INTEGER NOT NULL DEFAULT 0,
    "author" TEXT,
    "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "product" TEXT,
    "user" TEXT,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL DEFAULT '',
    "price" INTEGER,
    "quantity" INTEGER,
    "order" TEXT,
    "product" TEXT,
    "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL DEFAULT '',
    "total" INTEGER,
    "user" TEXT,
    "charge" TEXT NOT NULL DEFAULT '',
    "stripeSessionId" TEXT NOT NULL DEFAULT '',
    "status" TEXT DEFAULT 'COMPLETE',
    "payment_status" TEXT DEFAULT 'PAID',
    "shipping_address" TEXT NOT NULL DEFAULT '',
    "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coupon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "stripeId" TEXT NOT NULL DEFAULT '',
    "amount_off" INTEGER,
    "percent_off" INTEGER,
    "duration_in_months" INTEGER,
    "duration" TEXT NOT NULL,

    CONSTRAINT "Coupon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL DEFAULT '',
    "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT DEFAULT 'DRAFT',
    "template" TEXT DEFAULT 'FULLWIDTH',
    "pinned" INTEGER DEFAULT 0,
    "excerpt" TEXT NOT NULL DEFAULT '',
    "featured_image" TEXT NOT NULL DEFAULT '',
    "featured_video" TEXT NOT NULL DEFAULT '',
    "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "author" TEXT,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "slug" TEXT NOT NULL DEFAULT '',
    "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT DEFAULT 'DRAFT',
    "template" TEXT DEFAULT 'FULLWIDTH',
    "pinned" INTEGER DEFAULT 0,
    "excerpt" TEXT NOT NULL DEFAULT '',
    "featured_image" TEXT NOT NULL DEFAULT '',
    "featured_video" TEXT NOT NULL DEFAULT '',
    "content" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "allow_comments" BOOLEAN NOT NULL DEFAULT false,
    "author" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "summary" TEXT NOT NULL DEFAULT '[NEW]',
    "location" TEXT,
    "start" TIMESTAMP(3) NOT NULL,
    "end" TIMESTAMP(3),
    "price" INTEGER NOT NULL DEFAULT 0,
    "seats" INTEGER NOT NULL,
    "image" TEXT NOT NULL DEFAULT '',
    "excerpt" TEXT NOT NULL DEFAULT '',
    "description" JSONB NOT NULL DEFAULT '[{"type":"paragraph","children":[{"text":""}]}]',
    "status" TEXT DEFAULT 'ACTIVE',
    "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "qrcode" TEXT NOT NULL DEFAULT '',
    "event" TEXT,
    "email" TEXT NOT NULL DEFAULT '',
    "holder" TEXT,
    "orderCount" TEXT NOT NULL DEFAULT '',
    "cost" INTEGER NOT NULL DEFAULT 0,
    "chargeId" TEXT NOT NULL DEFAULT '',
    "order" TEXT,
    "status" TEXT DEFAULT 'PAID',
    "dateCreated" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "dateModified" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',
    "excerpt" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Booking_employees" (
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
CREATE TABLE "_Addon_subscriptionItems" (
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

-- CreateTable
CREATE TABLE "_SubscriptionPlan_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Product_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Coupon_subscriptionItems" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Page_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Post_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Event_hosts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Event_cohosts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Event_tags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Category_posts" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Category_pages" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Category_products" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Category_subscriptions" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Category_events" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
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

-- CreateIndex
CREATE UNIQUE INDEX "User_authId_key" ON "User"("authId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "User"("role");

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Role_label_key" ON "Role"("label");

-- CreateIndex
CREATE INDEX "Booking_service_idx" ON "Booking"("service");

-- CreateIndex
CREATE INDEX "Booking_location_idx" ON "Booking"("location");

-- CreateIndex
CREATE INDEX "Booking_customer_idx" ON "Booking"("customer");

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Location_name_key" ON "Location"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Location_address_key" ON "Location"("address");

-- CreateIndex
CREATE UNIQUE INDEX "Addon_name_key" ON "Addon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Addon_slug_key" ON "Addon"("slug");

-- CreateIndex
CREATE INDEX "Availability_employee_idx" ON "Availability"("employee");

-- CreateIndex
CREATE UNIQUE INDEX "SubscriptionPlan_slug_key" ON "SubscriptionPlan"("slug");

-- CreateIndex
CREATE INDEX "SubscriptionPlan_author_idx" ON "SubscriptionPlan"("author");

-- CreateIndex
CREATE INDEX "SubscriptionItem_subscriptionPlan_idx" ON "SubscriptionItem"("subscriptionPlan");

-- CreateIndex
CREATE INDEX "SubscriptionItem_user_idx" ON "SubscriptionItem"("user");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_author_idx" ON "Product"("author");

-- CreateIndex
CREATE INDEX "CartItem_product_idx" ON "CartItem"("product");

-- CreateIndex
CREATE INDEX "CartItem_user_idx" ON "CartItem"("user");

-- CreateIndex
CREATE INDEX "OrderItem_order_idx" ON "OrderItem"("order");

-- CreateIndex
CREATE INDEX "OrderItem_product_idx" ON "OrderItem"("product");

-- CreateIndex
CREATE INDEX "Order_user_idx" ON "Order"("user");

-- CreateIndex
CREATE UNIQUE INDEX "Coupon_name_key" ON "Coupon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");

-- CreateIndex
CREATE INDEX "Page_author_idx" ON "Page"("author");

-- CreateIndex
CREATE UNIQUE INDEX "Post_slug_key" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_author_idx" ON "Post"("author");

-- CreateIndex
CREATE INDEX "Event_location_idx" ON "Event"("location");

-- CreateIndex
CREATE INDEX "Ticket_event_idx" ON "Ticket"("event");

-- CreateIndex
CREATE INDEX "Ticket_holder_idx" ON "Ticket"("holder");

-- CreateIndex
CREATE INDEX "Ticket_order_idx" ON "Ticket"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_Booking_employees_AB_unique" ON "_Booking_employees"("A", "B");

-- CreateIndex
CREATE INDEX "_Booking_employees_B_index" ON "_Booking_employees"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Service_employees_AB_unique" ON "_Service_employees"("A", "B");

-- CreateIndex
CREATE INDEX "_Service_employees_B_index" ON "_Service_employees"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Service_tags_AB_unique" ON "_Service_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Service_tags_B_index" ON "_Service_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Location_services_AB_unique" ON "_Location_services"("A", "B");

-- CreateIndex
CREATE INDEX "_Location_services_B_index" ON "_Location_services"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Location_tags_AB_unique" ON "_Location_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Location_tags_B_index" ON "_Location_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Addon_services_AB_unique" ON "_Addon_services"("A", "B");

-- CreateIndex
CREATE INDEX "_Addon_services_B_index" ON "_Addon_services"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Addon_bookings_AB_unique" ON "_Addon_bookings"("A", "B");

-- CreateIndex
CREATE INDEX "_Addon_bookings_B_index" ON "_Addon_bookings"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Addon_subscriptionItems_AB_unique" ON "_Addon_subscriptionItems"("A", "B");

-- CreateIndex
CREATE INDEX "_Addon_subscriptionItems_B_index" ON "_Addon_subscriptionItems"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Addon_categories_AB_unique" ON "_Addon_categories"("A", "B");

-- CreateIndex
CREATE INDEX "_Addon_categories_B_index" ON "_Addon_categories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Addon_tags_AB_unique" ON "_Addon_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Addon_tags_B_index" ON "_Addon_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SubscriptionPlan_tags_AB_unique" ON "_SubscriptionPlan_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_SubscriptionPlan_tags_B_index" ON "_SubscriptionPlan_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Product_tags_AB_unique" ON "_Product_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Product_tags_B_index" ON "_Product_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Coupon_subscriptionItems_AB_unique" ON "_Coupon_subscriptionItems"("A", "B");

-- CreateIndex
CREATE INDEX "_Coupon_subscriptionItems_B_index" ON "_Coupon_subscriptionItems"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Page_tags_AB_unique" ON "_Page_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Page_tags_B_index" ON "_Page_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Post_tags_AB_unique" ON "_Post_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Post_tags_B_index" ON "_Post_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Event_hosts_AB_unique" ON "_Event_hosts"("A", "B");

-- CreateIndex
CREATE INDEX "_Event_hosts_B_index" ON "_Event_hosts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Event_cohosts_AB_unique" ON "_Event_cohosts"("A", "B");

-- CreateIndex
CREATE INDEX "_Event_cohosts_B_index" ON "_Event_cohosts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Event_tags_AB_unique" ON "_Event_tags"("A", "B");

-- CreateIndex
CREATE INDEX "_Event_tags_B_index" ON "_Event_tags"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Category_posts_AB_unique" ON "_Category_posts"("A", "B");

-- CreateIndex
CREATE INDEX "_Category_posts_B_index" ON "_Category_posts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Category_pages_AB_unique" ON "_Category_pages"("A", "B");

-- CreateIndex
CREATE INDEX "_Category_pages_B_index" ON "_Category_pages"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Category_products_AB_unique" ON "_Category_products"("A", "B");

-- CreateIndex
CREATE INDEX "_Category_products_B_index" ON "_Category_products"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Category_subscriptions_AB_unique" ON "_Category_subscriptions"("A", "B");

-- CreateIndex
CREATE INDEX "_Category_subscriptions_B_index" ON "_Category_subscriptions"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Category_events_AB_unique" ON "_Category_events"("A", "B");

-- CreateIndex
CREATE INDEX "_Category_events_B_index" ON "_Category_events"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Category_services_AB_unique" ON "_Category_services"("A", "B");

-- CreateIndex
CREATE INDEX "_Category_services_B_index" ON "_Category_services"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Category_locations_AB_unique" ON "_Category_locations"("A", "B");

-- CreateIndex
CREATE INDEX "_Category_locations_B_index" ON "_Category_locations"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_fkey" FOREIGN KEY ("role") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_service_fkey" FOREIGN KEY ("service") REFERENCES "Service"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_location_fkey" FOREIGN KEY ("location") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customer_fkey" FOREIGN KEY ("customer") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_employee_fkey" FOREIGN KEY ("employee") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionPlan" ADD CONSTRAINT "SubscriptionPlan_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionItem" ADD CONSTRAINT "SubscriptionItem_subscriptionPlan_fkey" FOREIGN KEY ("subscriptionPlan") REFERENCES "SubscriptionPlan"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubscriptionItem" ADD CONSTRAINT "SubscriptionItem_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartItem" ADD CONSTRAINT "CartItem_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_order_fkey" FOREIGN KEY ("order") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_product_fkey" FOREIGN KEY ("product") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_author_fkey" FOREIGN KEY ("author") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_location_fkey" FOREIGN KEY ("location") REFERENCES "Location"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_event_fkey" FOREIGN KEY ("event") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_holder_fkey" FOREIGN KEY ("holder") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_order_fkey" FOREIGN KEY ("order") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Booking_employees" ADD CONSTRAINT "_Booking_employees_A_fkey" FOREIGN KEY ("A") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Booking_employees" ADD CONSTRAINT "_Booking_employees_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Service_employees" ADD CONSTRAINT "_Service_employees_A_fkey" FOREIGN KEY ("A") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Service_employees" ADD CONSTRAINT "_Service_employees_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Service_tags" ADD CONSTRAINT "_Service_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Service_tags" ADD CONSTRAINT "_Service_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Location_services" ADD CONSTRAINT "_Location_services_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Location_services" ADD CONSTRAINT "_Location_services_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Location_tags" ADD CONSTRAINT "_Location_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Location_tags" ADD CONSTRAINT "_Location_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_services" ADD CONSTRAINT "_Addon_services_A_fkey" FOREIGN KEY ("A") REFERENCES "Addon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_services" ADD CONSTRAINT "_Addon_services_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_bookings" ADD CONSTRAINT "_Addon_bookings_A_fkey" FOREIGN KEY ("A") REFERENCES "Addon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_bookings" ADD CONSTRAINT "_Addon_bookings_B_fkey" FOREIGN KEY ("B") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_subscriptionItems" ADD CONSTRAINT "_Addon_subscriptionItems_A_fkey" FOREIGN KEY ("A") REFERENCES "Addon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_subscriptionItems" ADD CONSTRAINT "_Addon_subscriptionItems_B_fkey" FOREIGN KEY ("B") REFERENCES "SubscriptionItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_categories" ADD CONSTRAINT "_Addon_categories_A_fkey" FOREIGN KEY ("A") REFERENCES "Addon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_categories" ADD CONSTRAINT "_Addon_categories_B_fkey" FOREIGN KEY ("B") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_tags" ADD CONSTRAINT "_Addon_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Addon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Addon_tags" ADD CONSTRAINT "_Addon_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubscriptionPlan_tags" ADD CONSTRAINT "_SubscriptionPlan_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "SubscriptionPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SubscriptionPlan_tags" ADD CONSTRAINT "_SubscriptionPlan_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_tags" ADD CONSTRAINT "_Product_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Product_tags" ADD CONSTRAINT "_Product_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Coupon_subscriptionItems" ADD CONSTRAINT "_Coupon_subscriptionItems_A_fkey" FOREIGN KEY ("A") REFERENCES "Coupon"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Coupon_subscriptionItems" ADD CONSTRAINT "_Coupon_subscriptionItems_B_fkey" FOREIGN KEY ("B") REFERENCES "SubscriptionItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Page_tags" ADD CONSTRAINT "_Page_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Page_tags" ADD CONSTRAINT "_Page_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_tags" ADD CONSTRAINT "_Post_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Post_tags" ADD CONSTRAINT "_Post_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_hosts" ADD CONSTRAINT "_Event_hosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_hosts" ADD CONSTRAINT "_Event_hosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_cohosts" ADD CONSTRAINT "_Event_cohosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_cohosts" ADD CONSTRAINT "_Event_cohosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_tags" ADD CONSTRAINT "_Event_tags_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Event_tags" ADD CONSTRAINT "_Event_tags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_posts" ADD CONSTRAINT "_Category_posts_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_posts" ADD CONSTRAINT "_Category_posts_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_pages" ADD CONSTRAINT "_Category_pages_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_pages" ADD CONSTRAINT "_Category_pages_B_fkey" FOREIGN KEY ("B") REFERENCES "Page"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_products" ADD CONSTRAINT "_Category_products_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_products" ADD CONSTRAINT "_Category_products_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_subscriptions" ADD CONSTRAINT "_Category_subscriptions_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_subscriptions" ADD CONSTRAINT "_Category_subscriptions_B_fkey" FOREIGN KEY ("B") REFERENCES "SubscriptionPlan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_events" ADD CONSTRAINT "_Category_events_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_events" ADD CONSTRAINT "_Category_events_B_fkey" FOREIGN KEY ("B") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_services" ADD CONSTRAINT "_Category_services_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_services" ADD CONSTRAINT "_Category_services_B_fkey" FOREIGN KEY ("B") REFERENCES "Service"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_locations" ADD CONSTRAINT "_Category_locations_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Category_locations" ADD CONSTRAINT "_Category_locations_B_fkey" FOREIGN KEY ("B") REFERENCES "Location"("id") ON DELETE CASCADE ON UPDATE CASCADE;
