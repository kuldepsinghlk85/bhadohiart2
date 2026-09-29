const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'admin@bhadohiartsweave.com';
  const password = await bcrypt.hash('admin123', 10);

  const adminUser = await prisma.user.upsert({
    where: { email },
    update: {
      password,
      role: 'ADMIN',
    },
    create: {
      email,
      name: 'Site Administrator',
      password,
      role: 'ADMIN',
    },
  });

  console.log('Admin user created successfully:');
  console.log(`Email: ${adminUser.email}`);
  console.log(`Password: admin123`);
  console.log(`Role: ${adminUser.role}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
