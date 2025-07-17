const sequelize = require('../config/db');
const UserModel = require('./user.model');

const db = {};
db.sequelize = sequelize;
db.User = UserModel(sequelize);

module.exports = db;
