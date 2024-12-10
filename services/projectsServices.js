// const { Types } = require("mongoose");
// const { log } = require("console");
const { Projects } = require("../models/projects");
const { User } = require("../models/user");
const { HttpError, sendEmail } = require("../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const gravatar = require("gravatar"); // пакет для генерації аватара по емейл
// const path = require("path");
// const fs = require("fs/promises"); // відмовідає за всі операції з файлами
// const Jimp = require("jimp"); // пакет для обробки зображення (якщо, напр. користувач буде присилати велике зобр)
const { nanoid } = require("nanoid");


const { BASE_URL } = process.env;

/************************************************************/

// отримання усіх проектів
//в метод find() можна передавати критерії пошуку. Наприклад (find({title: "the best book", description:"trala"}))
//буде шукати значення з title "the best book" та description "trala". Якщо не знайде, верне пустий масив
//const result = await Projects.find({}, "title author"); верне масив тільки з полями title author, 
// а якщо перед полем поставити мінус то це ми позначимо, які поля нетреба повертати
exports.getAllProjects = async (user, query) => {
  const result = await Projects.find();
  return result;
};

/************************************************************/
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

  const verifyEmail = {
    to: email,
    subject: `Verify email ${email} on Ruslana's portfolio`,
    html: `<p>Hello!</p>
         <p>Please confirm your email address by clicking the link below:</p>
         <a href="${BASE_URL}/api/users/verify/${verificationToken}">Verify Email</a>
         <p>If you did not request this, you can safely ignore this email.</p>`,
  };

  await sendEmail(verifyEmail);

   return newUser;
};

/************************************************************/ 
  /***
   * @приймає req.body
   * @робить авторизує користувача
   * @вертає користувача, якщо такий є і новий токен для нього
   */
  exports.login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    if (!user.verify) {
      throw HttpError(401, "Email not verify"); //потім розкоментувати
    }

    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw HttpError(401, "Email or password invalid");
    }

    const payload = {
      id: user._id,
    };

    //для генерації токена відправляється id користувача, секретний ключ, який самі придумуємо і записуємо в env
    //та в expiresIn вказуємо, скільки буде "жити" токен
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "24h",
    });
    await User.findByIdAndUpdate(user._id, { token }); //записуємо цей токен в базу

    return { user, token };
  };
  
  