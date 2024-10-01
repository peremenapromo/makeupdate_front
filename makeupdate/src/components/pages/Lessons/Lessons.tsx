import { FC, useState } from 'react'
import { CustomSelectProps, SelectOption } from '../../../type/select'
import filter from './img/filter.svg'
import img from './img/img.svg'
import search from './img/search.svg'
import { Lesson } from './lesson'
import styles from './Lessons.module.scss'

const CustomSelect: React.FC<CustomSelectProps> = ({
	options,
	placeholder,
}) => {
	const [isOpen, setIsOpen] = useState(false)
	const [selectedOption, setSelectedOption] = useState<SelectOption | null>(
		null
	)

	const handleSelect = (option: SelectOption) => {
		setSelectedOption(option)
		setIsOpen(false)
	}

	const toggleOpen = () => {
		setIsOpen(prev => !prev)
	}

	return (
		<div className={styles.custom_select}>
			<button className={styles.btn_custom_select} onClick={toggleOpen}>
				<img className={styles.img_filter} src={filter} alt='' />
			</button>
			<div>
				{selectedOption ? selectedOption.label : ''}
				{isOpen && (
					<div>
						{options.map(option => (
							<div
								className={styles.option}
								key={option.value}
								onClick={() => handleSelect(option)}
							>
								<div className={styles.bottom_line}></div> {option.label}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export const Lessons: FC = () => {
	const options = [
		{ value: '1', label: 'По популярности' },
		{ value: '2', label: 'По дате публикации' },
	]
	return (
		<div className={styles.lessons_container}>
			<div className={styles.search_filter}>
				<div className={styles.filter}>
					<CustomSelect
						options={options}
						placeholder='Выберите вариант'
					></CustomSelect>
				</div>
				<div className={styles.search}>
					<img className={styles.vol} src={img} alt='' />
					<input className={styles.input} placeholder='Поиск' type='text' />
					<img className={styles.search_img} src={search} alt='' />
				</div>
			</div>
			<div className={styles.all_lessons_box}>
				<Lesson />
				<Lesson />
				<Lesson />
				<Lesson />
				<Lesson />
				<Lesson />
				<Lesson />
				<Lesson />
				<Lesson />
				<Lesson />
				<Lesson />
				<Lesson />
			</div>
		</div>
	)
}
