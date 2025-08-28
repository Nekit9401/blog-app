const express = require('express');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const { getUsers, getRoles, updateUser, deleteUser } = require('../controllers/users');
const mapUser = require('../helpers/mapUser');
const { USER_ROLE } = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.get('/', authenticated, hasRole([USER_ROLE.ADMIN]), async (req, res) => {
	const users = await getUsers();

	res.send({ data: users.map(mapUser) });
});

router.get('/roles', authenticated, hasRole([USER_ROLE.ADMIN]), (req, res) => {
	const roles = getRoles();

	res.send({ data: roles });
});

router.patch('/:id', authenticated, hasRole([USER_ROLE.ADMIN]), async (req, res) => {
	const newUser = await updateUser(req.params.id, {
		role: req.body.roleId,
	});

	res.send({ data: mapUser(newUser) });
});

router.delete('/:id', authenticated, hasRole([USER_ROLE.ADMIN]), async (req, res) => {
	await deleteUser(req.params.id);

	res.send({ error: null });
});

module.exports = router;
