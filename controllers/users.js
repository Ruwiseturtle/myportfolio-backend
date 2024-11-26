const { ctrlWrapper, HttpError } = require("../helpers"); // імпортуємо помилку для прокидування
const { User } = require("../models/user");

const { contactServices } = require("../services");

const { SECRET_KEY } = process.env;

/**
 * @призначення для регістриції користувача
 * reload hw-6
 */
const registerUser = async (req, res, next) => {
  const { email, password, subscription } = await contactServices.signup(req.body);

  res.status(201).json({
    user: {
      email: email,
      password: password,
      subscription: subscription,
    },
  });
};


module.exports = {
  registerUser: ctrlWrapper(registerUser),
//   loginUser: ctrlWrapper(loginUser),
//   logoutUser: ctrlWrapper(logoutUser),
//   getCurrentUser: ctrlWrapper(getCurrentUser),
//   updateUserSubscription: ctrlWrapper(updateUserSubscription),
//   updateUserAvatar: ctrlWrapper(updateUserAvatar),
//   verifyEmail: ctrlWrapper(verifyEmail),
//   resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
