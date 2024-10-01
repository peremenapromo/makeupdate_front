import { FC } from 'react'
import { Link } from 'react-router-dom'
import styles from './Burger.module.scss'
import user from './img/pussykiller.png'

// Types
import { BurgerAuth, ModalWindow } from '../../type/modal'

export const Burger: FC<ModalWindow & BurgerAuth> = ({ isOpen, onOpen }) => {
	if (!isOpen) return null

	return (
		<div className={styles.menu}>
			<ul className={styles.list}>
				<li className={styles.list_section}>Вы посетитель</li>
				<li className={styles.list_section}>Стать пользователем</li>
				<li className={styles.list_section}>Стать продавцом</li>
				<div className={styles.line}></div>
				<Link to='/profile' className={styles.list_section}>
					Настройки профиля
				</Link>
				<li onClick={onOpen} className={styles.list_section}>
					Добавить профиль
				</li>
				<div className={styles.line}></div>
				<div className={styles.profile_section}>
					<div className={styles.box_img}>
						<img className={styles.prof_sec_img} src={user} alt='profile_img' />
					</div>
					<span className={styles.prof_select}>View</span>
				</div>

				<li className={styles.list_section}>Выйти из профиля</li>
			</ul>
		</div>
	)
}
