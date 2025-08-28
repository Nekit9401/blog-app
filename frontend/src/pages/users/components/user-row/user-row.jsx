import styled from 'styled-components';
import { Icon } from '../../../../components';
import { TableRow } from '../table-row/table-row';
import { useState } from 'react';
import { PROP_TYPE } from '../../../../constants';
import PropTypes from 'prop-types';
import { request } from '../../../../utils';

const UserRowContainer = ({ className, id: userId, login, registeredAt, roleId: userRoleId, roles, onUserRemove }) => {
	const [initialroleId, setInitialRoleId] = useState(userRoleId);
	const [selectedRoleId, setSelectedRoleId] = useState(userRoleId);

	const onRoleChange = ({ target }) => {
		setSelectedRoleId(Number(target.value));
	};

	const onRoleSave = async (userId, newUserRoleId) => {
		await request(`/api/users/${userId}`, 'PATCH', { roleId: newUserRoleId });
		setInitialRoleId(newUserRoleId);
	};

	const isSaveButtonDisabled = selectedRoleId === initialroleId;

	return (
		<div className={className}>
			<TableRow border={true}>
				<div className='login-column'>{login}</div>
				<div className='registered-at-column'>{registeredAt}</div>
				<div className='role-column'>
					<select value={selectedRoleId} onChange={onRoleChange}>
						{roles.map(({ id: roleId, name: roleName }) => (
							<option key={roleId} value={roleId}>
								{roleName}
							</option>
						))}
					</select>
					<Icon
						disabled={isSaveButtonDisabled}
						iconId='fa-floppy-o'
						size={22}
						margin={'0 0 0 10px'}
						onClick={() => onRoleSave(userId, selectedRoleId)}
					/>
				</div>
			</TableRow>
			<Icon iconId='fa-trash-o' size={22} margin={'0 0 0 10px'} onClick={onUserRemove} />
		</div>
	);
};

export const UserRow = styled(UserRowContainer)`
	display: flex;
	align-items: center;
	margin-top: 10px;

	& select {
		font-size: 16px;
		padding: 0 5px;
	}
`;

UserRow.propTypes = {
	id: PropTypes.string.isRequired,
	login: PropTypes.string.isRequired,
	registeredAt: PropTypes.string.isRequired,
	roleId: PROP_TYPE.ROLE_ID.isRequired,
	roles: PropTypes.arrayOf(PROP_TYPE.ROLE).isRequired,
	onUserRemove: PropTypes.func.isRequired,
};
