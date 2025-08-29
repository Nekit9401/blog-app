const bcrypt = require('bcrypt');
const User = require('../models/User');
const { generate } = require('../helpers/token');
const { USER_ROLE } = require('../constants/roles');

//register

async function register(login, password) {
	if (!password) {
		throw new Error('Пароль не должне быть пустым');
	}

	const passwordHash = await bcrypt.hash(password, 10);

	const user = await User.create({ login, password: passwordHash });
	const token = generate({ id: user.id });

	return { user, token };
}

//login

async function login(login, password) {
	const user = await User.findOne({ login });

	if (!user) {
		throw new Error('Пользователь не найден!');
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password);

	if (!isPasswordMatch) {
		throw new Error('Неверный пароль!');
	}

	const token = generate({ id: user.id });

	return { token, user };
}

function getUsers() {
	return User.find();
}

function getRoles() {
	return [
		{ id: USER_ROLE.ADMIN, name: 'Администратор' },
		{ id: USER_ROLE.MODERATOR, name: 'Модератор' },
		{ id: USER_ROLE.READER, name: 'Читатель' },
	];
}

//delete

function deleteUser(id) {
	return User.deleteOne({ _id: id });
}

//edit(roles)

function updateUser(id, userData) {
	return User.findByIdAndUpdate(id, userData, { returnDocument: 'after' });
}

module.exports = {
	register,
	login,
	getUsers,
	getRoles,
	deleteUser,
	updateUser,
};
