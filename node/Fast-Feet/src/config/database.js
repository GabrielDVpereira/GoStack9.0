require('../env');

module.exports = {
  dialect: process.env.DB_DIALECT || 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'fast feet',
  storage: './__tests__/database.sqlite',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
