const { Schema, model } = require("mongoose");
const Joi = require("joi"); // joi - для перевірки даних, які приходять із фронтенда

const handleMongooseError = require("../middleswares/handleMongooseError");

const projectsSchema = new Schema(
  {
    // для перевірки даних, які відправляємо на бекенд
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    link: {
      type: String,
    },
    frameworks: {
      type: String,
    },
    project_type: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
); // для того, щоб показувало не версію документа, а дату створення обьекта

projectsSchema.post("save", handleMongooseError);

// joi - схема для перевірки даних, які приходять із фронтенда
const addSchema = Joi.object({
  image: Joi.string().required(),
  title: Joi.string().required(),
  link: Joi.string().required(),
  frameworks: Joi.string().required(),
  project_type: Joi.string().required()
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const Projects = model("myprojects", projectsSchema);

const schemas = {
  updateFavoriteSchema,
  addSchema,
};

module.exports = {
  Projects,
  schemas,
};
