import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import DataTable from '../components/dataTable';
import { useAuth } from '../context/Session';
import { postStore } from '../store/post';

export default function Admin() {
	const [searchValue, setSearchValue] = useState('');
	const [dataFiltered, setDataFiltered] = useState([]);
	const router = useRouter();

	const { session } = useAuth();
	const { list, isLoading, readAll } = postStore();

	const rowClick = (row) => {
		router.push(`/posts/${row}`);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'Post',
				columns: [
					{
						Header: 'ID',
						accessor: '_id',
					},
					{
						Header: 'Title',
						accessor: 'title',
					},
					{
						Header: 'Author',
						accessor: 'author',
					},
					{
						Header: 'Created At',
						accessor: 'createdAt',
					},
				],
			},
		],
		[]
	);

	const Table = () => {
		return (
			<div className="flex flex-col mt-32 items-center place-content-center">
				<input
					className="form-input block px-4 py-3 w-96"
					placeholder="Search by title"
					type="text"
					id="search"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<DataTable
					className="mt-8 w-auto p-8 rounded-md border h-auto flex flex-col items-center place-content-center"
					columns={columns}
					data={dataFiltered}
					rowClick={rowClick}
				/>
			</div>
		);
	};

	useEffect(() => {
		readAll();
	}, [session]);

	useEffect(() => {
		if (searchValue.length >= 3) {
			return setDataFiltered(
				list.filter((i) => i.title.toLowerCase() === searchValue.toLowerCase())
			);
		}
		setDataFiltered(list);
	}, [searchValue, list]);

	return (
		<>
			{isLoading ? (
				<h1>Loading...</h1>
			) : session?.state ? (
				<Table />
			) : (
				<h1>Not authorized</h1>
			)}
		</>
	);
}
