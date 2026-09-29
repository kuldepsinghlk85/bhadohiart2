const bcrypt = require('bcryptjs');

async function test() {
  const hash = '$2b$10$cvbKjJ4DerXuE.jFpRPPaeSMjb6v6R/X5VyoE7aaPQ1uuox8qhCO6';
  const password = 'admin123';
  const result = await bcrypt.compare(password, hash);
  console.log('Result:', result);
}

test();
