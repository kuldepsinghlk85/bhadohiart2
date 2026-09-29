const { createClient } = require('@libsql/client'); 
const db = createClient({ url: 'file:dev.db' }); 
console.log('success');
