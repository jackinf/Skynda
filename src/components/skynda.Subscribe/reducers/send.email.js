import remoteConfig from "../../../store/remoteConfig";
import {setIsSubscribed} from "../actions"

export const subscribe = (data) => (dispatch, getState) => {
    var email = JSON.stringify(data);
    console.log("subscribe data", email)
    return fetch(`${remoteConfig.remote}/api/subscribe/${email}`, {
      method: "POST",
      credentials: "include",
      headers: {"Accept": "application/json", "Content-Type": "application/json"},
      // body: JSON.stringify(email)
    })
      .then(resp => resp.json())
      .then(resp => {
        console.log(resp);
        dispatch(setIsSubscribed(true));
      });
}

