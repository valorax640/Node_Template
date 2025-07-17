const AuthService = require('../services/auth.service');

exports.register = async (req, res, next) => {
    try {
        const user = await AuthService.register(req.body);
        res.status(201).json({ message: 'User created', user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
        next(err);
    }
};


exports.login = async (req, res, next) => {
    try {
        const result = await AuthService.login(req.body);
        res.status(200).json(result);
    } catch (err) {
        next(err);
    }
};
