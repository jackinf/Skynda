/**
 * Created by jevgenir on 11/7/2016.
 */
import constants from "./constants";
import _ from "underscore";
import {LOCAL_STORAGE_PROFILE_KEY} from "./serviceHandler";

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY));
  } catch (ex) {
    return null;
  }
}

export function isLoggedIn() {
  const user = getStoredUser();
  return user != null && !_.isEmpty(user);
}

export function setUser(data) {
  localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(data));
}

export function unsetUser() {
  localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
}

/**
 * @param checkedRoles - List<string>
 * @returns {boolean} - success
 */
export function isLoggedInAs(checkedRoles = []) {
  if (!_.isArray(checkedRoles)) {
    console.info("userUtil: No role names has been supplied");
    return false;
  }

  const user = getStoredUser();
  if (!user || !_.isObject(user)) {
    console.info("userUtil: No user exists");
    return false;
  }

  const userRoles = user.roles;
  if (!userRoles || !_.isArray(userRoles)) {
    console.info("userUtil: No authority roles exist");
    return false;
  }

  const result = _.intersection(checkedRoles, userRoles);
  return result.length;
}
