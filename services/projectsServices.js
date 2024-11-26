// const { Types } = require("mongoose");
const { Projects } = require("../models/projects");
// const { User } = require("../models/user");
// const { HttpError, sendEmail } = require("../helpers");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const gravatar = require("gravatar"); // пакет для генерації аватара по емейл
// const path = require("path");
// const fs = require("fs/promises"); // відмовідає за всі операції з файлами
// const Jimp = require("jimp"); // пакет для обробки зображення (якщо, напр. користувач буде присилати велике зобр)
// const { nanoid } = require("nanoid");

// const { BASE_URL } = process.env;

// отримання усіх проектів
exports.getAllProjects = async (user, query) => {
  const result = await Projects.find();
  return result;
};
