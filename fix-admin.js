const fs = require('fs');
const path = require('path');

const files = [
  'src/app/admin/inquiries/page.tsx',
  'src/app/admin/orders/page.tsx',
  'src/app/admin/orders/[id]/page.tsx',
  'src/app/admin/portfolio-slider/page.tsx',
  'src/app/admin/products/new/page.tsx',
  'src/app/admin/products/page.tsx',
  'src/app/admin/products/[id]/edit/page.tsx',
  'src/app/admin/users/page.tsx',
  'src/app/admin/users/[id]/page.tsx'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace the Prisma queries with a try-catch fallback
  
  if (file.includes('inquiries/page.tsx')) {
    content = content.replace('const inquiries = await prisma.lead.findMany({', 'let inquiries: any[] = []; try { inquiries = await prisma.lead.findMany({');
    content = content.replace("orderBy: { createdAt: 'desc' }\n  });", "orderBy: { createdAt: 'desc' }\n  }); } catch (e) {}");
  }
  else if (file.includes('orders/page.tsx') && !file.includes('[id]')) {
    content = content.replace('const orders = await prisma.order.findMany({', 'let orders: any[] = []; try { orders = await prisma.order.findMany({');
    content = content.replace("orderBy: { createdAt: 'desc' }\n  });", "orderBy: { createdAt: 'desc' }\n  }); } catch(e) {}");
  }
  else if (file.includes('orders/[id]/page.tsx')) {
    content = content.replace('const order = await prisma.order.findUnique({', 'let order: any = null; try { order = await prisma.order.findUnique({');
    content = content.replace('include: { user: true }\n  });', 'include: { user: true }\n  }); } catch(e) {}');
  }
  else if (file.includes('portfolio-slider/page.tsx')) {
    content = content.replace('const images = await prisma.portfolioImage.findMany({', 'let images: any[] = []; try { images = await prisma.portfolioImage.findMany({');
    content = content.replace("orderBy: { order: 'asc' }\n  });", "orderBy: { order: 'asc' }\n  }); } catch(e) {}");
  }
  else if (file.includes('products/page.tsx') && !file.includes('new') && !file.includes('edit')) {
    content = content.replace('const products = await prisma.product.findMany({', 'let products: any[] = []; try { products = await prisma.product.findMany({');
    content = content.replace("orderBy: { createdAt: 'desc' }\n  });", "orderBy: { createdAt: 'desc' }\n  }); } catch(e) {}");
  }
  else if (file.includes('products/new/page.tsx')) {
    content = content.replace('const collections = await prisma.collection.findMany({', 'let collections: any[] = []; try { collections = await prisma.collection.findMany({');
    content = content.replace("orderBy: { name: 'asc' }\n  });", "orderBy: { name: 'asc' }\n  }); } catch(e) {}");
  }
  else if (file.includes('products/[id]/edit/page.tsx')) {
    content = content.replace('const [product, collections] = await Promise.all([', 'let product: any = null; let collections: any[] = []; try { [product, collections] = await Promise.all([');
    content = content.replace("orderBy: { name: 'asc' }\n    })\n  ]);", "orderBy: { name: 'asc' }\n    })\n  ]); } catch(e) {}");
  }
  else if (file.includes('users/page.tsx') && !file.includes('[id]')) {
    content = content.replace('const users = await prisma.user.findMany({', 'let users: any[] = []; try { users = await prisma.user.findMany({');
    content = content.replace("orderBy: { createdAt: 'desc' }\n  });", "orderBy: { createdAt: 'desc' }\n  }); } catch(e) {}");
  }
  else if (file.includes('users/[id]/page.tsx')) {
    content = content.replace('const user = await prisma.user.findUnique({', 'let user: any = null; try { user = await prisma.user.findUnique({');
    content = content.replace("orderBy: { createdAt: 'desc' } }\n    }\n  });", "orderBy: { createdAt: 'desc' } }\n    }\n  }); } catch(e) {}");
  }

  fs.writeFileSync(file, content);
}
console.log('Files updated successfully');
