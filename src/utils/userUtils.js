/**
 * Created by jevgenir on 11/7/2016.
 */
import constants from "./constants";
import _ from "underscore";

export function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE_KEYS.SKYNDA_USER));
  } catch (ex) {
    return null;
  }
}

export function isLoggedIn() {
  const user = getStoredUser();
  return user != null && !_.isEmpty(user);
}

export function setUser(data) {
  localStorage.setItem(constants.LOCAL_STORAGE_KEYS.SKYNDA_USER, JSON.stringify(data));
}

export function unsetUser() {
  localStorage.removeItem(constants.LOCAL_STORAGE_KEYS.SKYNDA_USER);
}

/**
 * @param roleNames - List<string>
 * @returns {boolean} - success
 */
export function isLoggedInAs(roleNames = []) {
  if (!_.isArray(roleNames)) {
    console.error("userUtil: No role names have been supplied");
    return false;
  }

  const user = getStoredUser();
  if (!user || !_.isObject(user)) {
    console.error("userUtil: No user exists");
    return false;
  }

  const authority = user.authority;
  if (!authority || !_.isArray(authority)) {
    console.error("userUtil: No authority roles exist");
    return false;
  }

  const authorityRoleNames = authority.map(ingleAuthority => singleAuthority.name);
  return _.intersection(roleNames, authorityRoleNames);
}
