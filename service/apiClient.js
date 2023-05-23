import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin-': '*',
		Accept: '*/*',
	},
	timeout: 30000,
});

apiClient.interceptors.request.use((request) => {
	NProgress.start();
	const userToken = localStorage.getItem('token') || null;
	if (userToken) request.headers.Authorization = `Bearer ${userToken}`;

	return request;
});

apiClient.interceptors.response.use(
	(response) => {
		NProgress.done();
		if (response.data.errors) return errorHandler(response);

		return response;
	},
	(error) => errorHandler(error)
);

const errorHandler = (error) => {
	NProgress.done();
	if (error.response) {
		const message = error.response.data.errorMessage || '';
		let error = '';

		switch (error.response.status) {
			case 400:
				error = `[${err.response.status}] Bad Request`;
				break;
			case 401:
				error = `[${err.response.status}] Unahutorized`;
				break;
			case 408:
				error = `[${err.response.status}] Request Timeout`;
				break;
			case 500:
				error = `[${err.response.status}] Internal Server Error`;
				break;
			case 503:
				error = `[${err.response.status}] Service Unavailable`;
				break;
			default:
				error = '[xxx] Unknown Error';
				break;
		}

		console.error('Error api 🤯', error);
		return Promise.reject(new Error(error));
	}

	console.error('Error no administrado', error);
	return Promise.reject(new Error('Error no administrado'));
};

export default apiClient;
