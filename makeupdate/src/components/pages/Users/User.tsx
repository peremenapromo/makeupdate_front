import { FC } from 'react'
import styles from './Users.module.scss'
// Import image
import location from './img/location.svg'
import user from './img/motinova.png'
import video from './img/video.svg'
import view from './img/view.svg'
//
export const User: FC = () => {
	return (
		<div className={styles.box_user}>
			<img className={styles.user_img} src={user} alt='user_photo' />
			<div className={styles.line}></div>
			<div className={styles.container}>
				<p className={styles.name}>Лена Мотинова</p>
				<p className={styles.location}>
					<img
						className={styles.image_location}
						src={location}
						alt='location_img'
					/>
					Россия,Сочи
				</p>
				<div className={styles.view_video}>
					<div className={styles.video}>
						<img src={video} alt='video_img' />
						<span className={styles.num}>12</span>
					</div>
					<div className={styles.view}>
						<img src={view} alt='view_img' />
						<span className={styles.num}>12333</span>
					</div>
				</div>
			</div>
		</div>
	)
}
