const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const jwtConfig = require('../config/jwt.config');

exports.register = async ({ name, email, password }) => {
    const existing = await User.findOne({ where: { email } });
    if (existing) throw new Error('Email already exists');

    const hash = await bcrypt.hash(password, 10);
    return await User.create({ name, email, password: hash });
};

exports.login = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('Invalid credentials');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user.id, email: user.email }, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn
    });

    return { token, user: { id: user.id, name: user.name, email: user.email } };
};
