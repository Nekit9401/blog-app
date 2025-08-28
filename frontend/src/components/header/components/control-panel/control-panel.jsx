import styled from 'styled-components';
import { Button, Icon } from '../../../../components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserLogin, selectUserRole } from '../../../../redux/selectors';
import { ROLE } from '../../../../constants';
import { logout } from '../../../../redux/actions';
import { checkAccess } from '../../../../utils';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
`;

const UserName = styled.div`
	font-size: 18px;
	font-weight: bold;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);

	const onLogout = () => {
		dispatch(logout());
		sessionStorage.removeItem('userData');
	};

	const isAdmin = checkAccess([ROLE.ADMIN], roleId);

	return (
		<div className={className}>
			<RightAligned>
				{roleId === ROLE.GUEST ? (
					<Button height='26px'>
						<Link to='/login'>Войти</Link>
					</Button>
				) : (
					<>
						<UserName>{login}</UserName>
						<Icon iconId='fa-sign-out' size={22} margin={'0 0 0 15px'} onClick={onLogout} />
					</>
				)}
			</RightAligned>
			<RightAligned>
				<Icon iconId='fa-backward' size={22} margin={'10px 0 0 0'} onClick={() => navigate(-1)} />
				{isAdmin && (
					<>
						<Link to='/post'>
							<Icon iconId='fa-file-text-o' size={22} margin={'10px 0 0 18px'} />
						</Link>
						<Link to='/users'>
							<Icon iconId='fa-users' size={22} margin={'10px 0 0 18px'} />
						</Link>
					</>
				)}
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	margin-top: 15px;
`;
