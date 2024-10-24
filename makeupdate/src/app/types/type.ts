export interface Icon {
  color: string;
}

// Auth type

export interface Register {
  email: any;
  telegram: any;
  password: any;
}

// User type
export interface User {
  name: string;
  location: any;
  videoNum: number;
  viewNum: number;
}

// ModalWindow
export interface ModalAuth {
  isOpen: boolean;
  onClose: () => void;
}

export interface OpenAuth {
  isAuthenticated: boolean;
  openAuthModal: () => void;
}

// ModalBurger
export interface ModalUser {
  isOpen: boolean;
  onClose: () => void;
}

export interface HeaderButton {
  openModal: () => void;
}
//

export interface firstName {
  value: string;
  onChange: (value: string) => void;
}

export interface secondaryName {
  value: string;
  onChange: (value: string) => void;
}

export interface ILocation {
  value: string;
  onChange: (value: string) => void;
}

export interface openInfo {
  open: boolean;
  isOpen: boolean;
}

// Authorized

export interface IUserData {
  email: string;
  password: string;
  telegram: string;
}

export interface IResponseUser {
  refresh: string;
  access: string;
}
export interface IRefresh {
  access: string;
}

export interface IResponseUserData {
  email: string;
  telegram?: any;
  password: string;
}

export interface IUser {
  email: string;
  password: string;
}

export interface IConfirm {
  uid: string;
  token: string;
}

export interface IGetUserData {
  city: string;
  country: string;
  description: string;
  first_name: string;
  lat_first_name: string;
  lat_last_name: string;
  last_name: string;
  phone: string;
  photo: string;
  show_telegram: boolean;
  show_telephone: boolean;
  telegram: string;
  user_id: number;
}

export interface IProfileMobileProps {
  photoLink: string;
  name: string;
  last_name: string;
  description: string;
  city: string;
  country: string;
}

export interface InputFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  label: string;
  required?: boolean;
  readOnly?: boolean;
  icon?: string;
  isPassword?: boolean;
  isVisible?: boolean;
  onVisibilityToggle?: any;
}
export interface InputsProps {
  onInputChange: (field: string, value: string | boolean) => void;
  initialFirstName?: string;
  initialLastName?: string;
  initialCity?: string;
  initialCountry?: string;
  initialTelegram?: string;
  initialPhone?: string;
  initialShowPhone: boolean;
  initialShowTelegram: boolean;
}

export interface IInitialStateAuth {
  email: string;
  telegram: string;
  password: string;
  confirmPassword: string;
  isLogin: boolean;
  isConfirmEmail: boolean;
  isChecked: boolean;
}

export interface IInputData {
  first_name: string;
  last_name: string;
  city: string;
  country: string;
  telegram: string;
  phone: string;
  show_telegram: boolean;
  show_telephone: boolean;
}
export interface IFollowers {
  count: number;
  next: number | null;
  previous: number | null;
  results: [
    {
      first_name: string;
      last_name: string;
      country: string;
      city: string;
      photo: string;
      user_id: 23;
    },
  ];
}
export interface IFollower {
  first_name?: string;
  last_name?: string;
  country?: string;
  city?: string;
  photo?: string;
  user_id?: 23;
}

export interface INavigationProps {
  followersCount?: number;
}
export interface IProfileData {
  first_name: string;
  last_name: string;
  country: string;
  city: string;
  description: string;
  photo: string;
  phone: string;
  user_id: number;
  is_subscribed: boolean;
  user: {
    telegram: string;
  };
}
export interface IInitialStateProfileCard {
  isEditing: boolean;
  isSaving: boolean;
  description: string;
  profileData: IProfileData | null;
  subscribe: boolean;
  followers: IFollowers | null;
  following: IFollowers | null;
  counter: ICounter[] | null;
}

export interface IHeaderState {
  activeLink: string | null;
  language: "ru" | "en";
  isModalOpen: boolean;
  isArrowUp: boolean;
}

export interface ILesson {
  id: number;
  user_id: number;
  title: string;
  description: string;
  price: number;
  views: number;
  duration: 128;
  published_date: string;
  count_comments: number;
  purchase_date: null;
  is_favorite: boolean;
  poster_url: string;
  all_lang: false;
}
export interface ILessonsState {
  count: number;
  next: null;
  previous: null;
  results: ILesson[];
}
export interface IInitialStateLessons {
  lessons: ILessonsState | null;
  profiles: Record<number, IProfileData | null>;
  activeFilter: "popularity" | "date";
  userLesson: ILessonsState | null;
  favouriteLessonsList: ILessonsState | null;
  usersProfiles: IGetUsersProfiles[] | null;
  isFavourite: {
    detail: string;
  } | null;
  blacklist: number[] ,

}

export interface IProfilePayload {
  user_id: number;
  profile: IProfileData | null;
}

export interface LessonProps {
  lessonData?: ILesson;
  profileData?: IProfileData | IGetUsersProfiles | null;
  currentId?: number;
}

export interface ICounter {
  user_id: number;
  total_views: number;
  count_lessons: number;
}

export interface IUsersProfiles {
  first_name: string;
  last_name: string;
  lat_first_name: string;
  lat_last_name: string;
  country: string;
  city: string;
  photo: string;
  user_id: number;
}

export interface IGetUsersProfiles {
  first_name: string;
  last_name: string;
  lat_first_name: string;
  lat_last_name: string;
  country: string;
  city: string;
  photo: string;
  user_id: number;
}
