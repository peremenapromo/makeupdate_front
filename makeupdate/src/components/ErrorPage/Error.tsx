import { FC } from 'react'
import sad_face from '../../img/sad_face.svg'
import styles from './Error.module.scss'

export const Error: FC = () => {
	return (
		<div className={styles.error_container}>
			<img className={styles.face} src={sad_face} alt='sad_face' />
			<h1 className={styles.title}>Ошибка 404</h1>
			<p className={styles.subtitle}>
				Страницу которую вы пытаетесь найти не существует
			</p>
		</div>
	)
}
