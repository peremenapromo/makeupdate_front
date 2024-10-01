import React, { FC, useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './App.module.scss'
import { AuthForm } from './components/AuthForm/AuthForm'
import { BottomBarPhone } from './components/BottomBarPhone/BottomBarPhone'
import { Burger } from './components/Burger/Burger'
import { Header } from './components/Header/Header'
import { Loading } from './components/Loading/Preloader'
import AppRouter from './router'

const App: FC = () => {
	const [loading, setLoading] = useState(true)
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
	const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				// Эмулируем загрузку данных
				await new Promise(resolve => setTimeout(resolve, 1000))
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			} finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])

	const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
		// Закрытие модальных окон при клике на подложку
		if (event.currentTarget === event.target) {
			closeAllModals()
		}
	}

	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)
	const openAuth = () => setIsAuthOpen(true)
	const closeAuth = () => setIsAuthOpen(false)

	const closeAllModals = () => {
		closeModal()
		closeAuth()
	}

	if (loading) return <Loading />

	return (
		<div onClick={handleOverlayClick} className={styles.App}>
			<Header onOpen={openModal} />
			<AppRouter />

			{isModalOpen && (
				<div className={styles.overlay} onClick={handleOverlayClick}>
					<Burger onOpen={openAuth} isOpen={isModalOpen} onClose={closeModal} />
				</div>
			)}

			{isAuthOpen && (
				<div className={styles.overlay_auth} onClick={handleOverlayClick}>
					<AuthForm isOpen={isAuthOpen} onClose={closeAuth} />
				</div>
			)}

			<BottomBarPhone />

			<ToastContainer
				position='top-right'
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
		</div>
	)
}

export default App
