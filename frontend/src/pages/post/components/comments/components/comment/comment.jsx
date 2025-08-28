import styled from 'styled-components';
import { Icon } from '../../../../../../components';
import { removeCommentAsync } from '../../../../../../redux/thunks';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../../../../redux/actions';
import { selectUserRole } from '../../../../../../redux/selectors';
import { ROLE } from '../../../../../../constants';
import PropTypes from 'prop-types';

const CommentContainer = ({ className, id, postId, author, content, publishedAt }) => {
	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const onDeleteComment = (postId, idComment) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => dispatch(removeCommentAsync(postId, idComment)),
			}),
		);
	};

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

	return (
		<div className={className}>
			<div className='comment-container'>
				<div className='inform-panel'>
					<div className='author'>
						<Icon iconId='fa-user-circle-o' size={18} margin={'0 10px 0 0'} cursor={'default'} />
						{author}
					</div>
					<div className='published-at'>
						<Icon iconId='fa-calendar-o' size={18} margin={'0 10px 0 0'} cursor={'default'} />
						{publishedAt}
					</div>
				</div>
				<div className='comment-text'>{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon iconId='fa-trash-o' size={20} margin={'0 0 0 10px'} onClick={() => onDeleteComment(postId, id)} />
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	margin-top: 20px;

	& .comment-container {
		width: 550px;
		font-size: 18px;
		border: 1px solid;
		padding: 5px 10px;
	}

	& .inform-panel {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
	}

	& .author {
		display: flex;
		align-items: center;
		font-size: 20px;
		font-weight: 600;
	}

	& .published-at {
		display: flex;
		align-items: center;
	}
`;

Comment.propTypes = {
	postId: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
};
