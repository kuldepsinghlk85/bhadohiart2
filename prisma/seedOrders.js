const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding dummy orders...");

  // Get a user or create a dummy user
  let user = await prisma.user.findFirst({ where: { email: 'admin@bhadohiartsweave.in' } });
  
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@bhadohiartsweave.in',
        role: 'ADMIN',
        password: 'password123'
      }
    });
  }

  // Get some products
  const products = await prisma.product.findMany({ take: 5 });

  if (products.length === 0) {
    console.log("No products found to create orders with.");
    return;
  }

  // Create 3 dummy orders
  const statuses = ['PENDING', 'PROCESSING', 'COMPLETED'];
  
  for (let i = 0; i < 3; i++) {
    const p1 = products[i % products.length];
    const p2 = products[(i + 1) % products.length];

    await prisma.order.create({
      data: {
        userId: user.id,
        status: statuses[i],
        total: 15000 * (i + 1),
        items: {
          create: [
            {
              productId: p1.id,
              quantity: 1,
              price: 10000 * (i + 1),
              size: '5x8 ft'
            },
            {
              productId: p2.id,
              quantity: 2,
              price: 2500 * (i + 1),
              size: '3x5 ft'
            }
          ]
        },
        payment: {
          create: {
            method: 'RAZORPAY',
            status: 'SUCCESS',
            amount: 15000 * (i + 1),
            transactionId: `txn_dummy_${Date.now()}_${i}`
          }
        }
      }
    });
    console.log(`Created order ${i + 1}`);
  }

  console.log("Seeding complete.");
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
