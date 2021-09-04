import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";

import { getUserWithRefresh } from "../../services/actions/authAction";
import { getCookie } from "../../utils/cookie";

export const ProtectedRoute = ({ children, ...rest }) => {
  const [isUserLoaded, setUserLoaded] = useState(false);

  const dispatch = useDispatch();

  const accessToken = getCookie("accessToken");

  useEffect(() => {
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
        accessToken ? (
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
