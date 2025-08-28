import { ACTION_TYPE } from '../actions';

const initialAppState = {
	error: null,
	isLoading: false,
};

export const uiReducer = (state = initialAppState, { type, payload }) => {
	switch (type) {
		case ACTION_TYPE.SET_ERROR:
			return {
				...state,
				error: payload,
			};

		case ACTION_TYPE.UI_START_LOADING:
			return {
				...state,
				error: null,
				isLoading: true,
			};

		case ACTION_TYPE.UI_STOP_LOADING:
			return {
				...state,
				isLoading: false,
			};

		default:
			return state;
	}
};
