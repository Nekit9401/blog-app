import { ACTION_TYPE } from './action-type';

export const setError = (errorMessage) => ({
	type: ACTION_TYPE.SET_ERROR,
	payload: errorMessage,
});
