import { Route, Switch } from "react-router-dom";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import styles from "./profile-page.module.css";

import { getUserWithRefresh } from "../services/actions/authAction";

import ProfileNavigation from "../components/profile-navigation/profile-navigation";
import ProfileInfo from "../components/profile-info/profile-info";

function ProfilePage() {
  // const user = useSelector((store) => store.auth);
  // if (!user.name && !user.email) {
  //   return <Redirect to="/login" />;
  // }
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch(getUserWithRefresh());
  }, []);

  return (
    <div className={styles.main}>
      <div className={`${styles.container} mr-15`}>
        <ProfileNavigation />
      </div>
      <Switch>
        <Route path="/profile" exact={true}>
          <ProfileInfo />
        </Route>
        <Route path="/profile/orders" exact={true}>
          <div className={styles.container}>
            <h1 className={`text text_type_main-medium text_color_inactive`}>
              На данный момент функционал не доступен
            </h1>
          </div>
        </Route>
      </Switch>
    </div>
  );
}

export default ProfilePage;
