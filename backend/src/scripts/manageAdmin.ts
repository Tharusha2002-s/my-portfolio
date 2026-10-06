import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";

async function main() {
  const args = process.argv.slice(2);
  const action = args[0] || "list";

  if (action === "list") {
    const admins = await prisma.admin.findMany();
    console.log("Current Admins in DB:", JSON.stringify(admins.map(a => ({
      id: a.id,
      username: a.username,
      email: a.email,
      name: a.name,
      role: a.role,
      updatedAt: a.updatedAt
    })), null, 2));
    return;
  }

  if (action === "set") {
    const username = args[1] || "admin";
    const email = args[2] || "tharushasangeeth034@gmail.com";
    const password = args[3] || "Tharusha@Admin2026!";
    const name = args[4] || "Tharusha Sangeeth";

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Check if admin exists
    const existing = await prisma.admin.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (existing) {
      const updated = await prisma.admin.update({
        where: { id: existing.id },
        data: {
          username,
          email,
          name,
          passwordHash,
          role: "SUPER_ADMIN",
        }
      });
      console.log("Admin updated successfully in DB:", {
        id: updated.id,
        username: updated.username,
        email: updated.email,
        name: updated.name,
        role: updated.role,
      });
    } else {
      const created = await prisma.admin.create({
        data: {
          username,
          email,
          name,
          passwordHash,
          role: "SUPER_ADMIN",
        }
      });
      console.log("Admin created successfully in DB:", {
        id: created.id,
        username: created.username,
        email: created.email,
        name: created.name,
        role: created.role,
      });
    }
  }
}

main()
  .catch((e) => {
    console.error("Error managing admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
