import { request } from '../../utils';

export const removePostAsync = (postId) => async () => {
	await request(`/api/posts/${postId}`, 'DELETE');
};
