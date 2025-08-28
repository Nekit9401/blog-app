import { request } from '../../utils';
import { addComment } from '../actions';

export const addCommentAsync = (postId, content) => async (dispatch) => {
	const comment = await request(`/api/posts/${postId}/comments`, 'POST', { content });

	dispatch(addComment(comment.data));
};
