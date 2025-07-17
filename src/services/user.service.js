const { User } = require('../models');

exports.getAllUsers = async () => {
    const users = await User.findAll({
        attributes: ['id', 'name', 'email']
    });
    return users;
};