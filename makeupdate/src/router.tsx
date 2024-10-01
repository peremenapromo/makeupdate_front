import { Route, Routes } from 'react-router-dom'

import { Confirm } from './components/Confirm/Confirm'
import { Error } from './components/ErrorPage/Error'
import Events from './components/pages/Events/Events'
import { Home } from './components/pages/Home/Home'
import { Lessons } from './components/pages/Lessons/Lessons'
import { Profile } from './components/pages/Profile/Profile'
import { Users } from './components/pages/Users/Users'
import { Menu } from './Menu/Menu'

function AppRouter() {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/lessons' element={<Lessons />} />
			<Route path='/users' element={<Users />} />
			<Route path='/events' element={<Events />} />
			<Route path='/profile' element={<Profile />} />
			<Route path='*' element={<Error />} />
			<Route path='/confirmEmail' element={<Confirm />} />
			<Route path='/menu' element={<Menu />} />
		</Routes>
	)
}

export default AppRouter
