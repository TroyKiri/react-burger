import { Route, Switch } from "react-router-dom";

import styles from "./profile-page.module.css";

import ProfileNavigation from "../components/profile-navigation/profile-navigation";
import ProfileInfo from "../components/profile-info/profile-info";

function ProfilePage() {
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
