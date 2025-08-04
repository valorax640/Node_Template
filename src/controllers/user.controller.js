const { User } = require('../models');

exports.listUsers = async (req, res, next) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'username']
        });
        res.status(200).json({ status: 'SUCCESS', message: 'Data Fetched Successfully', response: users });
    } catch (err) {
        next(err);
    }
};
