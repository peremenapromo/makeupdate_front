import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./app/service/store";
import { setUserData } from "app/service/user/userSlice";
const userDataFromLocalStorage = localStorage.getItem('userData');

if (userDataFromLocalStorage) {
  const parsedUserData = JSON.parse(userDataFromLocalStorage);
  store.dispatch(setUserData(parsedUserData));
  // console.log(parsedUserData)
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);


reportWebVitals();
