import styled from 'styled-components';
import { PrivateContent, H2 } from '../../components';
import { UserRow, TableRow } from './components';
import { useEffect, useState } from 'react';
import { OPERATION_SERVER, ROLE } from '../../constants';
import { checkAccess, request } from '../../utils';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../redux/selectors';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUserList, setShouldUpdateUserList] = useState(false);
	const userRole = useSelector(selectUserRole);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		const fetchData = async () => {
			const [usersResponse, rolesResponse] = await Promise.all([
				request('/api/users'),
				request('/api/users/roles'),
			]);

			const { error: usersError, data: usersData } = usersResponse;
			const { error: rolesError, data: rolesData } = rolesResponse;

			if (usersError || rolesError) {
				setErrorMessage(usersError || rolesError);
				return;
			}

			setUsers(usersData);
			setRoles(rolesData);
		};

		fetchData();
	}, [shouldUpdateUserList, userRole]);

	const onUserRemove = async (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) {
			return;
		}

		await request(`/api/users/${userId}`, 'DELETE');
		setShouldUpdateUserList(!shouldUpdateUserList);
	};

	return (
		<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
			<div className={className}>
				<H2>Пользователи</H2>
				<div className='table'>
					<TableRow>
						<div className='login-column'>Логин</div>
						<div className='registered-at-column'>Дата регистрации</div>
						<div className='role-column'>Роль</div>
					</TableRow>
					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registeredAt={registeredAt}
							roleId={roleId}
							roles={roles.filter(({ id }) => id !== ROLE.GUEST)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</div>
		</PrivateContent>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin: 0 auto;
	width: 570px;
	font-size: 18px;
`;
