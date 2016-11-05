/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from "react";

export default (store) => ({
  path: "login",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require("./Login").default);
    })
  }
})


// export default {
//
//   path: "/login",
//
//   action() {
//     return {
//       title,
//       component: <Login title={title}/>
//     };
//   }
//
// };
