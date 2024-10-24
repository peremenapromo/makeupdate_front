import { Route, Routes, useLocation } from "react-router-dom";
import { Confirm } from "../pages/Confirm/Confirm";
import { Error } from "../components/ErrorPage/Error";
import { Home } from "../pages/Home/Home";
import { Lessons } from "../pages/Lessons/Lessons";
import { Profile } from "../pages/MyProfile/Profile";
import { Users } from "../pages/Users/Users";
import { Menu } from "../Menu/Menu";
import { AuthForm } from "components/AuthForm/AuthForm";
import PrivateRoute from "components/PrivateRoute/PrivateRoute";
import { Events } from "pages/Events/Events";
import { ProfileUsers } from "pages/ProfileUsers/ProfileUsers";

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
      <Route path='/confirmEmail/:uid/:token' element={<Confirm />} />

      <Route path='*' element={<Error />} />
      <Route path='/users' element={<Users />} />
      <Route path='/menu' element={<Menu />} />
      <Route
        element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/:id' element={<ProfileUsers />} />
      </Route>
    </Routes>
  );
}

export default AppRouter;
