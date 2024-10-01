import { FC, useState } from 'react'
import styles from './Profile.module.scss'
import ProfileCard from './ProfileCard/ProfileCard'
import profile_top from './ProfileCard/img/profile_top.svg'

export const Profile: FC = () => {
	const [inputData, setInputData] = useState({ name: '', surname: '' })

	const handleInputChange = (field: string, value: string) => {
		setInputData(prevData => ({
			...prevData,
			[field]: value,
		}))
	}
	return (
		<div className={styles.profile_all_container}>
			<img
				className={styles.profile_top_img}
				src={profile_top}
				alt='profile_bg'
			/>
			<div className={styles.username_box}>
				<p className={styles.username}>
					{inputData.name ? inputData.name : 'ИМЯ'}
				</p>
				<p className={styles.username}>
					{inputData.surname ? inputData.surname : 'ФАМИЛИЯ'}
				</p>
			</div>
			<ProfileCard />
			<div className={styles.buttons_page_profile}>
				<div className={styles.buttons_containers_profile}>
					<button className={styles.button_main_profile}>
						<span className={styles.button_main_profile_text}>
							Мои уроки<sup className={styles.sup}>(13)</sup>
						</span>
					</button>
					<button className={styles.button_main_profile}>
						<span className={styles.button_main_profile_text}>
							Доступ к урокам
							<sup className={styles.sup}>(13)</sup>
						</span>
					</button>
					<button className={styles.button_main_profile}>
						<span className={styles.button_main_profile_text}>
							Избранные уроки
							<sup className={styles.sup}>(13)</sup>
						</span>
					</button>
					<button className={styles.button_main_profile}>
						<span className={styles.button_main_profile_text}>
							Мои события<sup className={styles.sup}>(13)</sup>
						</span>
					</button>
				</div>
				<div className={styles.buttons_containers_profile}>
					<button className={styles.button_main_profile}>
						<span className={styles.button_main_profile_text}>
							Мое портфолио
						</span>
					</button>
					<button className={styles.button_main_profile}>
						<span className={styles.button_main_profile_text}>
							Подписчиким <sup className={styles.sup}>(13)</sup>
						</span>
					</button>
					<button className={styles.button_main_profile}>
						<span className={styles.button_main_profile_text}>
							Подписки <sup className={styles.sup}>(13)</sup>
						</span>
					</button>
					<button className={styles.button_main_profile}>
						<span className={styles.button_main_profile_text}>Финансы</span>
					</button>
				</div>
				<div className={styles.buttons}></div>
			</div>
		</div>
	)
}
