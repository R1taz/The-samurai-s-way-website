import React from 'react'
import Header from '../Header/Header.tsx'
import Navbar from '../Navbar/Navbar.tsx'
import { Outlet } from 'react-router-dom'

const Layout = () => {
	return (
		<div className='app'>
			<Header />
			<div className='main'>
				<Navbar />
				<div className='content'>
					<Outlet />
				</div>
			</div>
		</div>
	)
}

export default Layout
