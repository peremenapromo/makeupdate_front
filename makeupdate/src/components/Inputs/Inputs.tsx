import { useState } from 'react'
import styles from './Inputs.module.scss'

interface InputsProps {
	onInputChange: (field: string, value: string) => void
}

export const Inputs: React.FC<InputsProps> = ({ onInputChange }) => {
	const [inputValue, setInputValue] = useState<string>('')
	const [secondValue, setSecondValue] = useState<string>('')
	const [locationValue, setLocationValue] = useState<string>('')
	const [error, setError] = useState<string>('')
	const [errorSecondName, setErrorSecondName] = useState<string>('')
	const [errorLocation, setErrorLocation] = useState<string>('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setInputValue(value)
		onInputChange('name', value) // Передача значения родителю

		if (value.trim() === '') {
			setError('Поле не должно быть пустым!')
		} else {
			setError('')
		}
	}

	const inputSecond = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setSecondValue(value)
		onInputChange('surname', value) // Передача значения родителю

		if (value.trim() === '') {
			setErrorSecondName('Поле не должно быть пустым!')
		} else {
			setErrorSecondName('')
		}
	}

	const inputLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setLocationValue(value)
		onInputChange('location', value) // Передача значения родителю

		if (value.trim() === '') {
			setErrorLocation('Поле не должно быть пустым!')
		} else {
			setErrorLocation('')
		}
	}

	return (
		<div className={styles.inputs_box}>
			<div className={styles.group}>
				<input
					value={inputValue}
					onChange={handleChange}
					className={styles.input}
					type='text'
					required
				/>
				<span className={styles.highlight}></span>
				<label>Введите Имя*</label>
				{error && <p className={styles.error}>{error}</p>}
			</div>
			<div className={styles.group}>
				<input
					value={secondValue}
					onChange={inputSecond}
					className={styles.input}
					type='text'
					required
				/>
				<span className={styles.highlight}></span>
				<label>Введите Фамилию*</label>
				{errorSecondName && <p className={styles.error}>{errorSecondName}</p>}
			</div>
			<div className={styles.group}>
				<input className={styles.input} type='text' required />
				<span className={styles.highlight}></span>
				<label>Введите Telegram</label>
			</div>
			<div className={styles.group}>
				<input className={styles.input} type='text' required />
				<span className={styles.highlight}></span>
				<label>Введите номер</label>
			</div>
			<div className={styles.group}>
				<input
					value={locationValue}
					onChange={inputLocation}
					className={styles.input}
					type='text'
					required
				/>
				<span className={styles.highlight}></span>
				<label>Введите местоположение*</label>
				{errorLocation && <p className={styles.error}>{errorLocation}</p>}
			</div>
		</div>
	)
}
