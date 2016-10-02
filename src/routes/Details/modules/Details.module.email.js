/**
 * Created by jevgenir on 10/2/2016.
 */

import fetch from 'isomorphic-fetch';
import remoteConfig from '../../../store/remoteConfig';

export const sendEmailAsync = (data) => {
  return (dispatch, getState) => {
    var form_data = new FormData();
    for (let key in data)
      form_data.append(key, data[key]);

    return fetch(remoteConfig.remote + '/api/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  };
};

export const actions = {
  sendEmailAsync
};
// jbr91@mail.ru
