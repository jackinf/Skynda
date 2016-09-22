import React from 'react';
import AdvancedSearch from './AdvancedSearch';

const title = 'Advanced search';

export default {

  path: '/search',

  action() {
    return {
      title,
      component: <AdvancedSearch title={title} />,
    };
  },

};
