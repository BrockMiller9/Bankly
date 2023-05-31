/** User related routes. */

const User = require("../models/user");
const express = require("express");
const router = new express.Router();
const ExpressError = require("../helpers/expressError");
const { authUser, requireLogin, requireAdmin } = require("../middleware/auth");
const validateRequestBody = require("../helpers/validate");

/** GET /
 *
 * Get list of users. Only logged-in users should be able to use this.
 *
 * It should return only *basic* info:
 *    {users: [{username, first_name, last_name}, ...]}
 *
 */

router.get("/", authUser, requireLogin, async function (req, res, next) {
  try {
    let users = await User.getAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
}); // end

/** GET /[username]
 *
 * Get details on a user. Only logged-in users should be able to use this.
 *
 * It should return:
 *     {user: {username, first_name, last_name, phone, email}}
 *
 * If user cannot be found, return a 404 err.
 *
 */

router.get(
  "/:username",
  authUser,
  requireLogin,
  async function (req, res, next) {
    try {
      let user = await User.get(req.params.username);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  }
);

/** PATCH /[username]
 *
 * Update user. Only the user themselves or any admin user can use this.
 *
 * It should accept:
 *  {first_name, last_name, phone, email}
 *
 * It should return:
 *  {user: all-data-about-user}
 *
 * It user cannot be found, return a 404 err. If they try to change
 * other fields (including non-existent ones), an error should be raised.
 *
 */

//had to delete the admin middleware from the route to allow either the user or admin to edit a user.
router.patch(
  "/:username",
  authUser,
  requireLogin,
  async function (req, res, next) {
    try {
      if (!req.curr_admin && req.curr_username !== req.params.username) {
        throw new ExpressError(
          "Only  that user or admin can edit a user.",
          401
        );
      }
      if (req.body.admin !== undefined) {
        throw new ExpressError("Not allowed to update admin field.", 401);
      }

      //We are not validating the input data. We should check that all fields are present and that they are the correct type.
      //Using a helper function to validate the input data
      const errors = validateRequestBody(req.body);
      if (errors.length > 0) {
        throw new ExpressError(`Validation errors: ${errors.join(", ")}`, 400);
      }

      // get fields to change; remove token so we don't try to change it
      let fields = { ...req.body };

      delete fields._token;

      let user = await User.update(req.params.username, fields);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  }
); // end

/** DELETE /[username]
 *
 * Delete a user. Only an admin user should be able to use this.
 *
 * It should return:
 *   {message: "deleted"}
 *
 * If user cannot be found, return a 404 err.
 */

router.delete(
  "/:username",
  authUser,
  requireAdmin,
  async function (req, res, next) {
    try {
      //BUG
      //we need to await the User.delete() call. Otherwise, the code will continue to run before the delete is complete. This can cause problems if the code that follows depends on the delete being complete.
      await User.delete(req.params.username);
      return res.json({ message: "deleted" });
    } catch (err) {
      return next(err);
    }
  }
); // end

module.exports = router;
