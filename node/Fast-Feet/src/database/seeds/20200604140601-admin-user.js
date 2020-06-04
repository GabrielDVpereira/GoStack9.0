
const bycript = require('bcrypt');
const crypto = require('crypto');

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('users', [
    {
      id: crypto.randomBytes(6).toString('HEX'),
      name: 'Distribuidora FastFeet',
      email: 'admin@fastfeet.com',
      password_hash: bycript.hashSync('123456', 8),
      created_at: new Date(),
      updated_at: new Date(),
    },
  ],
  {}),


  down: () => {

  },
};
