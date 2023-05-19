import { create } from 'zustand';
import apiClient from '../service/apiClient';
import { toast } from 'react-hot-toast';

const runFetch = async (_id) => {
	await fetch(`https://20.228.195.178/post/readById`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		body: JSON.stringify({
			_id,
		}),
	})
		.then((response) => set(() => ({ postList: response.data })))
		.catch((error) => {
			toast.error(error.toString(), { duration: 10000 });
		})
		.finally(() => {
			set(() => ({ isLoading: false }));
		});
};

export const postStore = create((set, get) => ({
	// Inizializamos el estado
	list: [],
	postList: {},
	isLoading: false,
	isError: false,

	// Definimos los métodos que modifican el estado
	readAll: () => {
		if (get().list.length) return get().list;

		set(() => ({ isLoading: true }));
		return apiClient
			.get('/post/readAll')
			.then((response) => {
				// set((state)=>{state.list = response.data});})
				set(() => ({ list: response.data }));
			})
			.catch((error) => {
				toast.error(error.toString(), { duration: 10000 });
			})
			.finally(() => {
				set(() => ({ isLoading: false }));
			});
	},
	read: (_id) => {
		if (get().post._id === _id) return get().post;
		set(() => ({ isLoading: true }));
		return runFetch(_id);
	},
}));
