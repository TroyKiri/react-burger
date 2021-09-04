import { useLocation, useHistory } from "react-router-dom";

export const ModalSwitch = () => {
  const location = useLocation();
  const history = useHistory();
  let background = location.state && location.state.background;
};
