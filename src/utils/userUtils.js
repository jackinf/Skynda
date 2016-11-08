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
    console.info("userUtil: No role names have been supplied");
    return false;
  }

  const user = getStoredUser();
  if (!user || !_.isObject(user)) {
    console.info("userUtil: No user exists");
    return false;
  }

  const authority = user.authority;
  if (!authority || !_.isArray(authority)) {
    console.info("userUtil: No authority roles exist");
    return false;
  }

  const authorityRoleNames = authority.map(singleAuthority => singleAuthority.name);
  const result = _.intersection(roleNames, authorityRoleNames);
  return result.length;
}
