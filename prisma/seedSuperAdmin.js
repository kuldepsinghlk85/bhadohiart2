const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const email = 'superadmin@bhadohiartsweave.com';
  // generate a salt manually and hash
  const salt = bcrypt.genSaltSync(10);
  const password = bcrypt.hashSync('password123', salt);

  const adminUser = await prisma.user.upsert({
    where: { email },
    update: {
      password,
      role: 'ADMIN',
    },
    create: {
      email,
      name: 'Super Admin',
      password,
      role: 'ADMIN',
    },
  });

  console.log('Super Admin user created successfully:');
  console.log(`Email: ${adminUser.email}`);
  console.log(`Password: password123`);
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
