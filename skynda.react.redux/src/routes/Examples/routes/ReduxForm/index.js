export default (store) => ({
  path: "redux-form",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require("./containers/ReduxForm.container").default);
    })
  }
})
