import { API_BASE_URL } from '../config';

export const request = async (url, method, data) => {
	const fullUrl = API_BASE_URL ? `${API_BASE_URL}${url}` : url;

	const res = await fetch(fullUrl, {
		headers: {
			'Content-type': 'application/json',
		},
		method: method || 'GET',
		body: data ? JSON.stringify(data) : undefined,
	});

	return await res.json();
};
