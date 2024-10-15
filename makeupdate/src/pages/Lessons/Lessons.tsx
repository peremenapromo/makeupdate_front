import { FC, useState } from "react";
import {
  CustomSelectProps,
  SelectOption,
} from "../../app/types/select";
import filter from "../../app/assets/lessons/filter.svg";
import img from "../../app/assets/lessons/img.svg";
import search from "../../app/assets/lessons/search.svg";
import { Lesson } from "./lesson";
import styles from "./Lessons.module.scss";

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  placeholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultOption =
    options.find((option) => option.value === "popular") || null;

  const [selectedOption, setSelectedOption] =
    useState<SelectOption | null>(defaultOption);

  const handleSelect = (option: SelectOption) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  const toggleOption = () => {
    setSelectedOption((prev) =>
      prev?.value === "popular"
        ? options.find((option) => option.value === "date") || null
        : options.find((option) => option.value === "popular") ||
          null,
    );
  };
  const toggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const filteredOptions = options.filter((option) =>
    selectedOption?.value === "popular"
      ? option.value !== "popular"
      : option.value === "popular",
  );

  return (
    <button className={styles.custom_select} onClick={toggleOption}>
      <img
        className={styles.img_filter}
        src={filter}
        alt='filterIcon'
      />
      <div className={styles.selectContainer}>
        <span>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        {/* {isOpen && (
          <div className={styles.optionBlock}>
            {filteredOptions.map((option) => (
              <div className={styles.option} key={option.value}>
                <div className={styles.bottom_line}></div>
                <span>{option.label}</span>
              </div>
            ))}
          </div>
        )} */}
      </div>
    </button>
  );
};

export const Lessons: FC = () => {
  const options = [
    { value: "popular", label: "По популярности" },
    { value: "date", label: "По дате публикации" },
  ];
  return (
    <div className={styles.lessons_container}>
      <div className={styles.filter_block}>
        <div className={styles.search_filter}>
          <div className={styles.filter}>
            <CustomSelect options={options} />
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.search}>
              <img className={styles.vol} src={img} alt='' />
              <input
                className={styles.input}
                placeholder='Поиск'
                type='text'
              />
              <img
                className={styles.search_img}
                src={search}
                alt=''
              />
            </div>
          </div>
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
  );
};
