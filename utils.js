var basicAuth = require('basic-auth');

exports.auth = function(username, password) {
  return function (req, res, next) {
    function unauthorized(res) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    };
    var user = basicAuth(req);
    if (!user || !user.name || !user.pass) {
      return unauthorized(res);
    };
    if (user.name === username && user.pass === password) {
      return next();
    } else {
      return unauthorized(res);
    };
  };
}
