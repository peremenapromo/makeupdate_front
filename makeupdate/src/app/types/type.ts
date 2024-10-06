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
  last_name: string;
  phone: string;
  photo: string;
  show_telegram: boolean;
  show_telephone: boolean;
  user: {
    telegram: string;
  };
  user_id: 2;
}