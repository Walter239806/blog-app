import { create } from 'zustand';
import apiClient from '../service/apiClient';
import { toast } from 'react-hot-toast';

export const postStore = create((set, get) => ({
	// Inizializamos el estado
	list: [],
	listActive: [],
	post: {},
	isLoading: false,
	isError: false,

	// Definimos los métodos que modifican el estado
	readAll: () => {
		if (get().list.length) return get().list;

		set(() => ({ isLoading: true }));
		return apiClient
			.get('/post/readAll')
			.then((response) => {
				console.log('Holaaaaa', response);
				set(() => ({ list: response.data }));
			})
			.catch((error) => {
				toast.error(error.toString(), { duration: 10000 });
			})
			.finally(() => {
				set(() => ({ isLoading: false }));
			});
	},
	readById: (_id) => {
		if (get().post._id === _id) return get().post;
		set(() => ({ isLoading: true }));
		return apiClient
			.post('/post/readByID', { _id })
			.then((response) => {
				set(() => ({ post: response.data }));
			})
			.catch((error) => {
				toast.error(error.toString(), { duration: 10000 });
			})
			.finally(() => {
				set(() => ({ isLoading: false }));
			});
	},
	readAllActive: () => {
		if (get().listActive.length) return get().listActive;

		set(() => ({ isLoading: true }));
		return apiClient
			.get('/post/readAllActive')
			.then((response) => {
				
				set(() => ({ listActive: response.data }));
			})
			.catch((error) => {
				toast.error(error.toString(), { duration: 10000 });
			})
			.finally(() => {
				set(() => ({ isLoading: false }));
			});
	},
}));
