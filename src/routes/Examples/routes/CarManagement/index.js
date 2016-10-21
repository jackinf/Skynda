import {injectReducer} from '../../../../store/reducers';
import { reducer as formReducer } from 'redux-form';

const REDUX_FORM_KEY = "form";  // redux-form requries "form" key to work

export default (store) => ({
  path: "car-management",
  getComponent(nextState, cb) {
    require.ensure([], (require) => {
      const ReduxFormContainer = require("./CarManagement.container").default;
      injectReducer(store, {key: REDUX_FORM_KEY, reducer: formReducer});
      cb(null, ReduxFormContainer);
    })
  }
})
