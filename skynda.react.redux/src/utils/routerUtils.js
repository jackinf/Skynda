/**
 * Created by jevgenir on 3/11/2017.
 */
import {toastr} from "react-redux-toastr";
import {isLoggedInAs} from "./userUtils";

export function onEnter() {
  toastr.clean();
}

export function onEnterAdmin(nextState, replace) {
  onEnter();
  if (!isLoggedInAs(["admin"])) {
    replace({ nextPathname: nextState.location.pathname, pathname: '/login' });
  }
}
