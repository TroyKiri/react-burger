import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, useLocation } from "react-router-dom";

export const ProtectedRouteAuth = ({ children, ...rest }) => {
  const user = useSelector((store) => store.auth);
  const [isUserLoaded, setUserLoaded] = useState(false);

  const { state } = useLocation();

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
