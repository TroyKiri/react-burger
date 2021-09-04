import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { getUserWithRefresh } from "../../services/actions/authAction";
import { getCookie } from "../../utils/cookie";

export const ProtectedRoute = ({ children, ...rest }) => {
  const user = useSelector((store) => store.auth);
  const [isUserLoaded, setUserLoaded] = useState(false); //?

  const dispatch = useDispatch();

  const accessToken = getCookie("accessToken");

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    accessToken && dispatch(getUserWithRefresh());
    setUserLoaded(true);
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        // accessToken ? (
        user.name && user.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};
