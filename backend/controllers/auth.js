var User = require("../models/users");
var jwt = require("jsonwebtoken");
var roles = require("../roles");

const MY_SECRET_KEY = "MY_SECRET_KEY";

login = async (req, res) => {
  
  let user = await User.findOne({ username: req.body.username });

  if (!user) {
    res.json({
      success: false,
      message: "Authentication failed. User not found."
    });
  } else if (user) {
    if (user.password != req.body.password) {
      res.json({
        success: false,
        message: "Authentication failed. Wrong password."
      });
    } else {
      const payload = {
        profile: user.profile,
        _id: user._id
      };

      var token = jwt.sign(payload, MY_SECRET_KEY, {
        expiresIn: "1h"
      });
      res.json({
        success: true,
        message: "Token Sucess!",
        token: token,
        user: {
          _id: user._id,
          username: user.username,
          role: user.role,
          visibleRoutes: roles.find(e => e.role === user.role   ).routes
        }
      });
    }
  }
};

checkAuth = (req, res, next) => {
  if (req.url === "/login" || req.url === "/users") {
    next();
    return;
  }

  var token = req.body.token || req.query.token || req.headers["authorization"]; //Bearer token
  if (token) {
    jwt.verify(token, MY_SECRET_KEY, function(err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: "Failed to authenticate token."
        });
      } else {
        return res.json({ success: true, message: "Token validated." });
      }
    });
  } else {
    return res.json({ success: false, message: "No token provided." });
  }
};

module.exports = {
  login,
  checkAuth
};
