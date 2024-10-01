import { FC, useEffect, useState } from 'react'
import { Inputs } from '../../../Inputs/Inputs'
import styles from '../Profile.module.scss'
import location from './img/location.svg'
import undefinedImage from './img/unknown_user.svg'
import videos from './img/videos.svg'
import view from './img/view.svg'

const ProfileCard: FC = () => {
	const [isEditing, setIsEditing] = useState(false)
	const [activeButton, setActiveButton] = useState<string | null>(null)
	const [inputData, setInputData] = useState({
		location: '',
	})

	useEffect(() => {
		const savedButton = localStorage.getItem('activeButton')
		if (savedButton) {
			setActiveButton(savedButton)
		}
	}, [])

	const handleButtonClick = (buttonName: string) => {
		setActiveButton(buttonName)
		localStorage.setItem('activeButton', buttonName)
	}

	const toggleEdit = () => {
		setIsEditing(prev => !prev)
	}

	const handleInputChange = (field: string, value: string) => {
		setInputData(prev => ({ ...prev, [field]: value }))
	}

	return (
		<div className={styles.profile_box}>
			<div className={styles.profile_img_box}>
				<img
					className={styles.img_me}
					src={undefinedImage}
					alt='profile_photo or icon'
				/>
			</div>
			<div className={styles.box_name_mobile}>
				<p className={styles.username_mobile}>ЛЕНА МОТИНОВА</p>
			</div>
			<div className={styles.box_loc_vid_view}>
				<p className={styles.location}>
					<img
						className={styles.location_img}
						src={location}
						alt='location_icon'
					/>
					{inputData.location ? inputData.location : 'Не задано'}
				</p>
				<div className={styles.videos_view}>
					<p className={styles.vid_see}>
						<img
							className={styles.vid_see_img}
							src={videos}
							alt='videos_icon'
						/>
						0
					</p>
					<p className={styles.vid_see}>
						<img className={styles.vid_see_img} src={view} alt='view_icon' />0
					</p>
				</div>
			</div>

			{/* Условия для отображения инпутов */}
			{isEditing && <Inputs onInputChange={handleInputChange} />}

			<div className={styles.buttons}>
				<button className={`${styles.button}`} onClick={toggleEdit}>
					<span className={`${styles.btn_text}`}>
						{isEditing ? 'Сохранить' : 'Редактировать'}
					</span>
				</button>
				{['Опубликовать урок', 'Опубликовать событие', 'Опубликовать фото'].map(
					button => (
						<button
							key={button}
							className={`${styles.button} ${
								activeButton === button ? styles.active_button : ''
							}`}
							onClick={() => handleButtonClick(button)}
						>
							<span
								className={`${styles.btn_text} ${
									activeButton === button ? styles.btn_text_active : ''
								}`}
							>
								{button}
							</span>
						</button>
					)
				)}
			</div>

			<div className={styles.info_me}>
				<h3 className={styles.title_me}>Обо мне:</h3>
				<p className={styles.text_me}>Заполнить описание</p>
			</div>
		</div>
	)
}

export default ProfileCard
