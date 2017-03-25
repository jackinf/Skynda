/**
 * Created by jevgenir on 3/11/2017.
 */
import {toastr} from "react-redux-toastr";
import {isLoggedInAs} from "./userUtils";

export function onEnter() {
  toastr.clean();
}

export function redirectToLogin(nextState = null, replace = null) {
  replace({ nextPathname: nextState.location.pathname, pathname: '/login' });
}

export function onEnterAdmin(nextState, replace) {
  onEnter();
  if (!isLoggedInAs(["admin"])) {
    if (nextState && replace) {
      redirectToLogin(nextState, replace);
    }
    return false;
  }
  return true;
}

export function onEnterAdminOrVehicleManager(nextState = null, replace = null) {
  onEnter();
  if (!isLoggedInAs(["admin", "vehiclemanager"])) {
    if (nextState && replace) {
      redirectToLogin(nextState, replace);
    }
    return false;
  }
  return true;
}
