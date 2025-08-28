import { PAGINATION_LIMIT } from '../../../constants';

export const getLastPageFromTotalCountPosts = (totalCountPosts) => {
	const limit = PAGINATION_LIMIT;

	return Math.ceil(Number(totalCountPosts) / limit);
};
