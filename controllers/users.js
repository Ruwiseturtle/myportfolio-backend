const { ctrlWrapper, HttpError } = require("../helpers"); // імпортуємо помилку для прокидування
const { User } = require("../models/user");

const { projectsServices } = require("../services");

const { SECRET_KEY } = process.env;

/**
 * @призначення для регістрації користувача (заводимо нового користувача в базу)
 * reload hw-6
 */
const registerUser = async (req, res, next) => {
  const { login, email } = await projectsServices.signup(req.body);

  res.status(201).json({
    user: {
      login: login,
      email: email,
    },
  });
};

// коли користувач в поштовому язику заходить по ссилку для підтверження емейлу, то викликається цей роутер
const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken }); //findOne - знаходе перше співпадіння, якщо його немає, повертає null

  if (!user) {
    throw HttpError(401, "Email found");
  }

  await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: "" });

  res.status(200).json({
    message: "Email verify success",
  });

}

// для повторної відправки емейлу
const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email not found");
  }

  if (user.verify) {
    res.sendStatus(404);
    // throw HttpError(401, "Email already verify");
  }

   const verifyEmail = {
     to: email,
     subject: "Verify email",
     html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click verify email</a>`,
   };

   await sendEmail(verifyEmail);

  res.json({
    message: "Verify email send success"
  })
}

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
      },
    },
  });

}

const logoutUser = async (req, res, next) => {
  const { msg } = await contactServices.logOut(req.user);

  res.json({
    message: msg,
  });
};

const getCurrentUser = async (req, res, next) => {
  const { email, subscription } = await contactServices.getCurrent(req.user);

  res.json({
    email: email,
    subscription: subscription,
  });
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
  loginUser: ctrlWrapper(loginUser),
  logoutUser: ctrlWrapper(logoutUser),
  getCurrentUser: ctrlWrapper(getCurrentUser),
//   updateUserSubscription: ctrlWrapper(updateUserSubscription),
//   updateUserAvatar: ctrlWrapper(updateUserAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
