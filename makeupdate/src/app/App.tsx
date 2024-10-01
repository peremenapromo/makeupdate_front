import { FC, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./App.module.scss";
import { AuthForm } from "../components/AuthForm/AuthForm";
import { BottomBarPhone } from "../components/BottomBarPhone/BottomBarPhone";
import { Burger } from "../components/Burger/Burger";
import { Header } from "../components/Header/Header";
import { Loading } from "../components/Loading/Loading";
import AppRouter from "./router";
import { useLocation } from "react-router";

const App: FC = () => {
  const [loading, setLoading] = useState(true); // Начальное состояние загрузки
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };
    fetchData();
  }, []);

  // Обрабатывает нажатия по оверлею
  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (event.currentTarget === event.target) {
      setIsModalOpen(false);
      setIsAuthOpen(false);
    }
  };

  // Функции открытия и закрытия модальных окон
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openAuth = () => {
    setIsAuthOpen(true);
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  if (loading) return <Loading />; // Простой индикатор загрузки

  return (
    <div onClick={handleOverlayClick} className={styles.App}>
      {location.pathname !== "/confirmEmail" ? (
        <Header onOpen={openModal} />
      ) : (
        ""
      )}
      <AppRouter />
      {isModalOpen && (
        <div className={styles.overlay} onClick={handleOverlayClick}>
          <Burger
            onOpen={openAuth}
            isOpen={isModalOpen}
            onClose={closeModal}
          />
        </div>
      )}
      {isAuthOpen && (
        <div
          onClick={handleOverlayClick}
          className={styles.overlay_auth}>
          <AuthForm isOpen={isAuthOpen} onClose={closeAuth} />
        </div>
      )}
      <BottomBarPhone />
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
    </div>
  );
};
export default App;
