/**
 * Created by jevgenir on 10/29/2016.
 */
import {injectReducer} from '../../../../store/reducers';
import {reducer as formReducer} from 'redux-form';

const REDUX_FORM_KEY = "form";  // redux-form requries "form" key to work

export default (store) => ({
  path: "file-upload",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const FileUploadContainer = require("./containers/FileUploadContainer").default;
      injectReducer(store, {key: REDUX_FORM_KEY, reducer: formReducer});
      cb(null, FileUploadContainer);
    })
  }
})
