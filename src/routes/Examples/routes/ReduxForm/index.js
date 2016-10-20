export default (store) => ({
  path: "redux-form",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ReduxFormView = require("./ReduxFormView").default;
      cb(null, ReduxFormView);
    })
  }
})
