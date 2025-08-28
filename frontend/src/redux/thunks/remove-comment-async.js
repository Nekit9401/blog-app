import { request } from '../../utils';
import { removeComment } from '../actions';

export const removeCommentAsync = (postId, idComment) => async (dispatch) => {
	await request(`/api/posts/${postId}/comments/${idComment}`, 'DELETE');

	dispatch(removeComment(idComment));
};
