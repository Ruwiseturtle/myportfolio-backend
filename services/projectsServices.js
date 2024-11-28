// const { Types } = require("mongoose");
const { Projects } = require("../models/projects");
const { User } = require("../models/user");
// const { HttpError, sendEmail } = require("../helpers");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const gravatar = require("gravatar"); // пакет для генерації аватара по емейл
// const path = require("path");
// const fs = require("fs/promises"); // відмовідає за всі операції з файлами
// const Jimp = require("jimp"); // пакет для обробки зображення (якщо, напр. користувач буде присилати велике зобр)
// const { nanoid } = require("nanoid");

// const { BASE_URL } = process.env;

// отримання усіх проектів
//в метод find() можна передавати критерії пошуку. Наприклад (find({title: "the best book", description:"trala"}))
//буде шукати значення з title "the best book" та description "trala". Якщо не знайде, верне пустий масив
//const result = await Projects.find({}, "title author"); верне масив тільки з полями title author, 
// а якщо перед полем поставити мінус то це ми позначимо, які поля нетреба повертати
exports.getAllProjects = async (user, query) => {
  const result = await Projects.find();
  return result;
};

//реєстрація нового користувача (заводимо нового користувача в базу)
exports.signup = async (userdata) => {
  const { email, password } = userdata;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use"); //якщо такий користувач вже є, то не реєструємо йго, а викидаємо помилку
  }

  const hashPassword = await bcrypt.hash(password, 10); //хешуємо пароль (без можливості розшифрувати. 10 це сіль, тобто сила шифрування)
  // const avatarURL = gravatar.url(email); // створюємо аватарку автоматично
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...userdata,
    password: hashPassword,
    // avatarURL,
    verificationToken,
  });

  // const verifyEmail = {
  //   to: email,
  //   subject: "Verify email",
  //   html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  // };

  // await sendEmail(verifyEmail);

  return newUser;
};
