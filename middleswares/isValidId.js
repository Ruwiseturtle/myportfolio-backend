const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

//перевіряємо чи правильний id за допомогою встроєної ф-ції isValidObjectId в mongoose
const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  console.log("проверка id");
  console.log(contactId);
  if (!isValidObjectId(contactId)) {
    next(HttpError(400, `${contactId} is not valid id`));
  }
  next();
};

module.exports = isValidId;
