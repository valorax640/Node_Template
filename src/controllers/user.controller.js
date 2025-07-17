const UserService = require('../services/user.service');

exports.listUsers = async (req, res, next) => {
    try {
        const users = await UserService.getAllUsers();
        res.status(200).json(users);
    } catch (err) {
        next(err);
    }
};
