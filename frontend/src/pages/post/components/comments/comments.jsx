import { useState } from 'react';
import styled from 'styled-components';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserRole } from '../../../../redux/selectors';
import { addCommentAsync } from '../../../../redux/thunks';
import { PROP_TYPE, ROLE } from '../../../../constants';
import PropTypes from 'prop-types';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');

	const dispatch = useDispatch();
	const userRole = useSelector(selectUserRole);

	const onNewCommentAdd = (postId, content) => {
		dispatch(addCommentAsync(postId, content));
		setNewComment('');
	};

	const isGuest = ![ROLE.ADMIN, ROLE.MODERATOR, ROLE.READER].includes(userRole);

	return (
		<div className={className}>
			{!isGuest && (
				<div className='new-comment'>
					<textarea
						name='comment'
						value={newComment}
						placeholder='Комментарий...'
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>
					<Icon
						iconId='fa-paper-plane-o'
						size={18}
						margin={'0 0 0 10px'}
						onClick={() => onNewCommentAdd(postId, newComment)}
					/>
				</div>
			)}
			<div className='comments-list'>
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
						postId={postId}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	width: 580px;
	margin: 20px auto;

	& .new-comment {
		display: flex;
		width: 100%;
	}

	& .new-comment textarea {
		padding: 10px;
		font-size: 18px;
		width: 550px;
		height: 120px;
		resize: none;
	}
`;

Comments.propTypes = {
	comments: PropTypes.arrayOf(PROP_TYPE.COMMENT).isRequired,
	postId: PropTypes.string.isRequired,
};
