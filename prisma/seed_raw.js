const { PrismaClient } = require('@prisma/client');
const { PrismaLibSql } = require('@prisma/adapter-libsql');
const { createClient } = require('@libsql/client');
const bcrypt = require('bcryptjs');

const libsql = createClient({ url: 'file:dev.db' });
const adapter = new PrismaLibSql(libsql);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding database...');
  const hashedPassword = await bcrypt.hash('admin123', 10);
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@bhadohiartsweave.in' },
    update: {},
    create: {
      email: 'admin@bhadohiartsweave.in',
      name: 'Super Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });
  console.log('Admin user seeded:', adminUser.email);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
