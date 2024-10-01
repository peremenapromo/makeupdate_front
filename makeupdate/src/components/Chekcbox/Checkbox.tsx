'use client'
import { FC } from 'react'
import styles from './Checkbox.module.scss'

interface CheckboxProps {
	checked: boolean
	onChange: (checked: boolean) => void
}

export const Checkbox: FC<CheckboxProps> = ({ checked, onChange }) => {
	const handleCheckboxChange = () => {
		onChange(!checked) // меняем состояние
	}

	return (
		<label className={styles.button} htmlFor='myCheckbox'>
			<input
				className={styles.input_checkbox}
				type='checkbox'
				id='myCheckbox'
				checked={checked}
				onChange={handleCheckboxChange}
			/>
			<span
				className={`${styles.checkbox} ${checked ? styles.checked : ''}`}
			></span>
			<span className='text'>
				Я даю согласие на обработку своих персональных данных и принимаю условия
				оферты
			</span>
		</label>
	)
}
