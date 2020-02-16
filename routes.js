const routes = require('next-routes')();

routes
  .add('/certificates/new', '/certificates/new')
  .add('/certificates/:address', '/certificates/show')
  .add('/about', '/about');
  // .add('/#vows','/');
module.exports = routes;
