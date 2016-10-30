/**
 * Created by zekar on 10/30/2016.
 */
export default (store) => ({
  path: "toastr",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      cb(null, require("./ToastrComponent").default);
    })
  }
})
