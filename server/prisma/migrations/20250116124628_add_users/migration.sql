-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "contact_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_contact_id_key" ON "users"("contact_id");
