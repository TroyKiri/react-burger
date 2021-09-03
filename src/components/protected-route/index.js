import { access } from "fs";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { getUserWithRefresh } from "../../services/actions/authAction";
import { deleteCookie, getCookie } from "../../utils/cookie";

export const ProtectedRoute = ({ children, ...rest }) => {
  const user = useSelector((store) => store.auth);
  const [isUserLoaded, setUserLoaded] = useState(false); //?

  const accessToken = getCookie("accessToken");
  const dispatch = useDispatch();

  // console.log(document.cookie);
  // deleteCookie("accessToken");
  // deleteCookie("refreshToken");
  // deleteCookie("token");
  // console.log(getCookie("refreshToken"));

  const init = async () => {
    await dispatch(getUserWithRefresh());
    setUserLoaded(true);
  };

  useEffect(() => {
    dispatch(getUserWithRefresh());
    setUserLoaded(true);
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={
        () => (user.name && user.email ? children : <Redirect to="/login" />)
        // accessToken ? children : <Redirect to="/login" />
      }
    />
  );
};
