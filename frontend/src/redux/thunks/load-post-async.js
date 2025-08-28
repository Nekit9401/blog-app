import { request } from '../../utils';
import { setError, setPostData, uiStartLoading, uiStopLoading } from '../actions';

export const loadPostAsync = (postId) => async (dispatch) => {
	dispatch(uiStartLoading());

	const postData = await request(`/api/posts/${postId}`);

	if (postData.data) {
		dispatch(setPostData(postData.data));
	}

	if (postData.error) {
		dispatch(setError(postData.error));
	}

	dispatch(uiStopLoading());
};
