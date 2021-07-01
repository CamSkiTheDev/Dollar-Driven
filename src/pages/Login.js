import { Link } from 'react-router-dom'

import { useState } from 'react'

export default function Login() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const handleChange = (e) =>
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}))

	return (
		<div className='bg-green-500 w-full min-h-screen flex items-center justify-center'>
			<div className='p-4 bg-white rounded'>
				<h3 className='text-2xl font-bold'>Dollar-Driven Login</h3>
				<form className='w-72 flex flex-col my-4'>
					<input
						className='my-2 rounded w-full'
						type='email'
						name='email'
						placeholder='Email Address'
						required
						value={formData.email}
						onChange={handleChange}
					/>
					<input
						className='my-2 rounded w-full'
						type='password'
						name='password'
						placeholder='Password'
						required
						value={formData.password}
						onChange={handleChange}
					/>
					<Link className='text-blue-600 underline'>
						Don't have an account?
					</Link>
					<button
						type='submit'
						className='flex justify-center py-2 mt-4 w-24 rounded bg-indigo-500 text-white self-end'
					>
						Login
					</button>
				</form>
			</div>
		</div>
	)
}
