import { useState } from 'react';
import { useAuth } from '../context/Session';
import toast from 'react-hot-toast';
import Layout from '../components/layout';
import Head from 'next/head';
import Container from '../components/container';

export default function Login() {
	const [validated, setValidated] = useState(false);
	const [email, setEmail] = useState('a@test1.com');
	const [error, setError] = useState('');
	const [messageError, setMessageError] = useState('');
	const [password, setPassword] = useState('Welcome123456!');
	const { signIn, onError, errorMessage } = useAuth();

	const login = (e) => {
		e.preventDefault();

		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.stopPropagation();
			return;
		}
		setValidated(true);

		signIn({ email, password });
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name === 'email') {
			setEmail(value);
		} else {
			setPassword(value);
		}
	};

	return (
		<Layout>
			<Head>
				<title>{`Blog-App`}</title>
			</Head>
			<div className="flex flex-col items-center place-content-center">
				<div className="flex flex-col items-center place-content-center mt-16 w-full">
					<h1 className="text-3xl font-semibold">Sign In</h1>
					<form
						className="flex flex-col mt-8 space-y-6 w-auto p-8 rounded-md border h-auto"
						onSubmit={login}
						noValidate
						validated={validated}
					>
						<div className="flex flex-col items-center rounded-md shadow-sm -space-y-px mb-4 w-auto">
							<label className="block text-sm  text-gray-700">Email</label>
							<input
								type="email"
								className="form-input block px-4 py-3 w-96"
								required
								name="email"
								placeholder="Email"
								value={email}
								onChange={handleChange}
							/>
						</div>
						<div className="rounded-md shadow-sm -space-y-px mb-4">
							<label className="block text-sm  text-gray-700">Password</label>
							<input
								type="text"
								className="form-input block px-4 py-3"
								required
								name="password"
								placeholder="password"
								value={password}
								onChange={handleChange}
							/>
						</div>
						<div>
							<button
								type="submit"
								onClick={login}
								className="block bg-grey-700 border border-grey-700 hover:bg-gray-600 font-semibold w-full px-4 py-3 rounded-md"
							>
								Sign In
							</button>
						</div>
					</form>
				</div>
			</div>
		</Layout>
	);
}
