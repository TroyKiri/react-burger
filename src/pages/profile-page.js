import { Route, Switch } from "react-router-dom";

import styles from "./profile-page.module.css";

import ProfileNavigation from "../components/profile-navigation/profile-navigation";
import ProfileInfo from "../components/profile-info/profile-info";
import OrderList from "../components/order-list/order-list";

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
          <OrderList />
        </Route>
      </Switch>
    </div>
  );
}

export default ProfilePage;
