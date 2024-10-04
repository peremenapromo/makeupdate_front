import { Route, Routes, useLocation } from "react-router-dom";

import { Confirm } from "../pages/Confirm/Confirm";
import { Error } from "../components/ErrorPage/Error";
import Events from "../pages/Events/Events";
import { Home } from "../pages/Home/Home";
import { Lessons } from "../pages/Lessons/Lessons";
import { Profile } from "../pages/Profile/Profile";
import { Users } from "../pages/Users/Users";
import { Menu } from "../Menu/Menu";
import { AuthForm } from "components/AuthForm/AuthForm";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";

function AppRouter({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const location = useLocation();
  const backgroundLocation =
    location.state?.backgroundLocation || location;

  return (
    <Routes location={backgroundLocation}>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<AuthForm />} />
      <Route path='/lessons' element={<Lessons />} />
      <Route path='/events' element={<Events />} />

      <Route
        element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route path='/users' element={<Users />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/menu' element={<Menu />} />
      </Route>

      <Route path='*' element={<Error />} />
      <Route path='/confirmEmail/:uid/:token' element={<Confirm />} />
    </Routes>
  );
}

export default AppRouter;
