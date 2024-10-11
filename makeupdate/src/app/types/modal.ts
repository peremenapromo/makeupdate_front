export interface ModalWindow {
  isOpen: boolean;
  onClose: () => void;
}
export interface HeaderProps {
  onOpen: () => void;
  onClose: () => void;
  onOpenAuth: () => void;
  isOpenBurger: boolean;
}

export interface ModalInfo {
  isOpen: boolean;
  onClose: () => void;
}

export interface AuthForm {
  isOpen?: boolean;
  onClose?: () => void;
}

export interface BurgerAuth {
  onOpen?: () => void;
}
