const ctrlWrapper = (ctrl) => {
  
  const func = async (req, res, next) => {


    try {      
      await ctrl(req, res, next);
      
    } catch (error) {
      console.log(error);
      
      console.log("помилка");
      
      next(error);
    }
  };

  return func;
};

module.exports = ctrlWrapper;
