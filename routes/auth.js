/** Auth-related routes. */

const User = require("../models/user");
const express = require("express");
const router = express.Router();
const createTokenForUser = require("../helpers/createToken");

/** Register user; return token.
 *
 *  Accepts {username, first_name, last_name, email, phone, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 */

router.post("/register", async function (req, res, next) {
  // bug #1 - we are not validating the input data. We should check that all fields are present and that they are the correct type.
  //  I added the following code to validate the input data: if(!(username && password && first_name && last_name && email && phone)) { return res.status(400).send("All input is required"); }

  try {
    const { username, password, first_name, last_name, email, phone } =
      req.body;
    if (!(username && password && first_name && last_name && email && phone)) {
      return res.status(400).send("All input is required");
    }

    let user = await User.register({
      username,
      password,
      first_name,
      last_name,
      email,
      phone,
    });
    const token = createTokenForUser(username, user.admin);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
}); // end

/** Log in user; return token.
 *
 *  Accepts {username, password}.
 *
 *  Returns {token: jwt-token-string}.
 *
 *  If incorrect username/password given, should raise 401.
 *
 */

router.post("/login", async function (req, res, next) {
  // bug #2 - we are not validating the input data. We should check that all fields are present and that they are the correct type.
  try {
    const { username, password } = req.body;
    if (!(username && password)) {
      return res.status(400).send("Username and password are required");
    }
    // bug #3 - we are not awaiting the User.authenticate() call. This means that the code will continue to run before the authentication is complete. This can cause problems if the code that follows depends on the authentication being complete.
    let user = await User.authenticate(username, password);
    const token = createTokenForUser(username, user.admin);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
}); // end

module.exports = router;
