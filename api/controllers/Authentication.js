const passport = require("passport");

class Authentication {
  static local(req, res, next) {
    passport.authenticate("local", { session: false }, (error, user, info) => {
      if (error && error.name === "InvalidArgumenterrorr") {
        return res.status(401).json({ error: error.message });
      }

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (!user) {
        return res.status(401).json();
      }

      req.user = user;
      return next();
    })(req, res, next);
  }
  static bearer(req, res, next) {
    passport.authenticate("bearer", { session: false }, (error, user, info) => {
      if (error && error.name === "JsonWebTokenerrorr") {
        return res.status(401).json({ error: error.message });
      }

      if (error && error.name === "TokenExpirederrorr") {
        return res
          .status(401)
          .json({ error: error.message, expiradoEm: error.expiredAt });
      }

      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (!user) {
        return res.status(401).json();
      }

      req.token = info.token;
      req.user = user;
      return next();
    })(req, res, next);
  }
}

module.exports = Authentication;
