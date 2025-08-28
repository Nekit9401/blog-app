import styled from 'styled-components';
import { Icon } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { deletePostAction, openModal } from '../../../../redux/actions';
import { removePostAsync } from '../../../../redux/thunks';
import { useNavigate } from 'react-router-dom';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';
import { selectUserRole } from '../../../../redux/selectors';
import PropTypes from 'prop-types';

const SpecialPanelContainer = ({ className, postId, publishedAt, iconEditButton, onEditButton }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userRole = useSelector(selectUserRole);

	const onDeletePost = () => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: async () => {
					await dispatch(removePostAsync(postId));
					dispatch(deletePostAction());
					navigate('/');
				},
			}),
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return (
		<div className={className}>
			<div className='published-at'>
				{publishedAt && <Icon iconId='fa-calendar-o' size={20} margin={'0 10px 0 0'} cursor={'default'} />}
				{publishedAt}
			</div>
			{isAdmin && (
				<div className='buttons'>
					<Icon iconId={iconEditButton} size={20} margin={'0 10px 0 0'} onClick={onEditButton} />
					{publishedAt && <Icon iconId='fa-trash-o' size={20} margin={'0 10px 0 0'} onClick={onDeletePost} />}
				</div>
			)}
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	margin: ${({ margin }) => margin};
	font-size: 18px;

	& .published-at {
		display: flex;
		align-items: center;
	}

	& .buttons {
		display: flex;
		align-items: center;
	}
`;

SpecialPanel.propTypes = {
	postId: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	iconEditButton: PropTypes.string.isRequired,
	onEditButton: PropTypes.func.isRequired,
};
