export default (store) => ({
  path : 'details',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Details = require('./details').default;
      cb(null, Details);
    }, 'counter')
  }
})
