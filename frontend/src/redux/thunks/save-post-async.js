import { request } from '../../utils';
import { setPostData } from '../actions';

export const savePostAsync = (id, newPostData) => async (dispatch) => {
	const saveRequest = id
		? request(`/api/posts/${id}`, 'PATCH', newPostData)
		: request('/api/posts', 'POST', newPostData);

	const savedPostData = await saveRequest;

	dispatch(setPostData(savedPostData.data));

	return savedPostData.data;
};
