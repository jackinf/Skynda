import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'about',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Counter = require('./containers/AboutContainer').default;
      const reducer = require('./modules/about').default;
      injectReducer(store, { key: 'counter', reducer });
      cb(null, Counter);
    }, 'about')
  }
})
