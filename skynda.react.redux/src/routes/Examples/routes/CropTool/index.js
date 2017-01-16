/**
 * Created by jevgenir on 10/29/2016.
 */
import {injectReducer} from '../../../../store/reducers';

export default (store) => ({
  path: "crop-tool",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      injectReducer(store, {key: "cropTool", reducer: require("./reducers/CropTool.reducer").default});
      cb(null, require("./containers/CropTool.container").default);
    })
  }
})
