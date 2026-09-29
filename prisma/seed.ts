import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

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
