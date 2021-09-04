import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";

import { getUserWithRefresh } from "../../services/actions/authAction";
import { getCookie } from "../../utils/cookie";

export const ProtectedRouteAuth = ({ children, ...rest }) => {
  const user = useSelector((store) => store.auth);
  const [isUserLoaded, setUserLoaded] = useState(false); //?
  const [token, setToken] = useState();

  const dispatch = useDispatch();
  const { state } = useLocation();
  const accessToken = getCookie("accessToken");

  useEffect(() => {
    setUserLoaded(true);
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={() =>
        !user.name && !user.email ? (
          children
        ) : (
          <Redirect to={(state && state.from.pathname) || "/"} />
        )
      }
    />
  );
};
