import { FC } from 'react'
import styles from './Loading.module.scss'

export const Loading: FC = () => {
	return (
		<div className={styles.loading_container}>
			<h1 className={styles.title_loader}>MAKEUPDATE</h1>
			<div className={styles.spinner}></div>

			<p>Loading...</p>
		</div>
	)
}
