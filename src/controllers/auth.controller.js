const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const jwtConfig = require('../config/jwt.config');

exports.register = async (req, res, next) => {
    try {
        const { name, email, username, password } = req.body;

        const existing = await User.findOne({ where: { email } });
        if (existing) throw new Error('Email already exists');

        const existingUsername = await User.findOne({ where: { username } });
        if (existingUsername) throw new Error('Username already exists');

        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, username, password: hash });

        res.status(201).json({ status: 'SUCCESS', message: 'User Created Successfully', user: user });
    } catch (err) {
        next(err);
    }
};


exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ where: { username } });
        if (!user) throw new Error('Invalid Username');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error('Invalid Password');

        const token = jwt.sign({ id: user.id, name: user.name }, jwtConfig.secret, {
            expiresIn: jwtConfig.expiresIn
        });

        const result = { token, user: user };
        res.status(200).json({ status: 'SUCCESS', message: 'Login Successful', response: result });
    } catch (err) {
        next(err);
    }
};
