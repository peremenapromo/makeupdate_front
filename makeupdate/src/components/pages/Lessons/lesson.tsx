import { FC } from 'react'
// Import images
import channel from '../Profile/ProfileCard/img/unknown_user.svg'
import comment from './img/comment.svg'
import lesson from './img/lesson.svg'
import more from './img/more_img.svg'
import play from './img/play.svg'
import star from './img/star.svg'
import view from './img/view.svg'
import wallet from './img/wallet.svg'
import styles from './Lessons.module.scss'

export const Lesson: FC = () => {
	return (
		<div className={styles.lesson}>
			<div className={styles.imageContainer}>
				<img className={styles.img_lesson} src={lesson} alt='img_lesson' />
				<div className={styles.centerOverlay}>
					<button className={styles.button_play}>
						<img className={styles.play_img} src={play} alt='' />
					</button>
					<div className={styles.time_box}>
						<div className={styles.time_lessons}>10:10</div>
					</div>
				</div>
			</div>
			<div className={styles.name_les_btn_share}>
				<p className={styles.name_les}>Укладка волос в необычном стиле</p>
				<button className={styles.btn_share}>
					<img className={styles.img_share} src={more} alt='' />
				</button>
			</div>
			<p className={styles.date}>Опубликовано: 20.02.2024</p>
			<p className={styles.info}>
				Дескриптор, максимум 200 символов. Дескриптор, максимум 200 символов.
				Дескриптор, максимум 200 символов. Дескриптор, максимум 200 символов.
				Дескриптор, максимум 200 символов.
			</p>
			<div className={styles.channel_box}>
				<div className={styles.channel}>
					<img className={styles.img_channel} src={channel} alt='' />
					<div className={styles.name_view_com}>
						<p className={styles.name_channel}>
							<span>Лена Мотинова</span>
							<img className={styles.img_name} src={star} alt='' />
						</p>
						<div className={styles.view_comm_box}>
							<div className={styles.view_comment}>
								<img className={styles.img_view_com} src={view} alt='' />
								<span className={styles.num_view_com}>1200</span>
							</div>
							<div className={styles.view_comment}>
								<img className={styles.img_view_com} src={comment} alt='' />
								<span className={styles.num_view_com}>22</span>
							</div>
						</div>
					</div>
				</div>
				<button className={styles.buy_btn}>
					<img className={styles.img_buy} src={wallet} alt='' />
					<p className={styles.text_buy}>Купить</p>
					<p className={styles.num_buy}>399₽</p>
				</button>
			</div>
		</div>
	)
}
