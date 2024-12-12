const ctrlWrapper = (ctrl) => {
  console.log(ctrl);
  
  const func = async (req, res, next) => {
    try {
      console.log("щось робить");
      
      await ctrl(req, res, next);
      console.log("sss");      
      console.log(req);
      
    } catch (error) {
      console.log("помилка");
      
      next(error);
    }
  };

  return func;
};

module.exports = ctrlWrapper;
