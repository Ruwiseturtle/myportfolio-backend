const { ctrlWrapper } = require("../helpers"); // імпортуємо помилку для прокидування

const { projectsServices } = require("../services");

// ************ витягуємо усі проекти************
const getAll = (async (req, res) => {

  // const users = await User.find().select('+password');
  // const users = await User.find().select('-email');
  // const users = await User.find().select('name year');
  // const users = await User.find();

   const myprojects = await projectsServices.getAllProjects(
     req.user,
     req.query
   );

   res.status(200).json({
     msg: "Success!",
     myprojects,
   });

});

module.exports = {
  getAll: ctrlWrapper(getAll),
};
