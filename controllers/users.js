const { ctrlWrapper, HttpError } = require("../helpers"); // імпортуємо помилку для прокидування
const { User } = require("../models/user");

const { projectsServices } = require("../services");

const { SECRET_KEY } = process.env;

/**
 * @призначення для регістрації користувача (заводимо нового користувача в базу)
 * reload hw-6
 */
const registerUser = async (req, res, next) => {
  const { login, email, password } = await projectsServices.signup(req.body);

  res.status(201).json({
    user: {
      login: login,
      email: email,
      password: password,
    },
  });
};

/**
 * @призначення для авторизації користувача
 */

const loginUser = async (req, res, next) => {
  const { user, token } = await projectsServices.login(req.body.email, req.body.password);

  res.status(200).json({
    ResponseBody: {
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });

}

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
//   logoutUser: ctrlWrapper(logoutUser),
//   getCurrentUser: ctrlWrapper(getCurrentUser),
//   updateUserSubscription: ctrlWrapper(updateUserSubscription),
//   updateUserAvatar: ctrlWrapper(updateUserAvatar),
//   verifyEmail: ctrlWrapper(verifyEmail),
//   resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
