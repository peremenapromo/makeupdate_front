import { FC } from 'react'
import styles from './Home.module.scss'
import lessons from './img/lessons.svg'
import users from './img/users.svg'
export const Home: FC = () => {
	return (
		<div className={styles.container_home}>
			<div className={styles.text_box_home}>
				<p className={styles.title}>MAKEUPDATE</p>
				<p className={styles.subtitle}>
					Смотри и продавай уроки по макияжу в любой точке мира на любом
					цифровом устройстве и удобном языке
				</p>
			</div>
			<div className={styles.lessons_users_box}>
				<p className={styles.les_us}>
					<img className={styles.img_les_us} src={lessons} alt='lessons_icon' />
					<span className={styles.les_us_text}> Уроки</span>
					<span className={styles.num}>12000</span>
				</p>
				<p className={styles.les_us}>
					<img className={styles.img_les_us} src={users} alt='users_icon' />
					<span className={styles.les_us_text}>Пользователи</span>
					<span className={styles.num}>12000</span>
				</p>
			</div>
		</div>
	)
}
