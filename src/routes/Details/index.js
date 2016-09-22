/**
 * Created by zekar on 9/14/2016.
 */

import React from 'react';
import Details from './details';

const title = 'Car details';

export default {

  path: '/details',

  action() {
    return {
      title,
      component: <Details />,
    };
  },

};
