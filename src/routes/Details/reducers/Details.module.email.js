/**
 * Created by jevgenir on 10/2/2016.
 */

import fetch from "isomorphic-fetch";
import remoteConfig from "../../../store/remoteConfig";

/**
 * Sends email for subscription for newsletter
 * @param data
 * @returns {function()}
 */
export const sendEmailAsync = (data) => {
  return () => {
    var formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }

    return fetch(remoteConfig.remote + "/api/email/person", {
      method: "POST",
      headers: {"Accept": "application/json", "Content-Type": "application/json"},
      body: JSON.stringify(data)
    });
  };
};

/**
 * If person has a question, he asks by sending an email.
 * @param data
 * @returns {function()}
 */
export const sendQuestionByEmailAsync = (data) => {
  return () => {
    return fetch(remoteConfig.remote + "/api/email/question", {
      method: "POST",
      headers: {"Accept": "application/json", "Content-Type": "application/json"},
      body: JSON.stringify(data)
    });
  };
};

export const actions = {
  sendEmailAsync,
  sendQuestionByEmailAsync
};
