/**
 * Created by jevgenir on 10/2/2016.
 */

import fetch from 'isomorphic-fetch';
import remoteConfig from '../../../store/remoteConfig';

export const sendEmailAsync = (data) => {
  return (dispatch, getState) => {
    return fetch(remoteConfig.remote + '/api/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: data
    });
  };
};

export const actions = {
  sendEmailAsync
};
