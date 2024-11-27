const subscrENUM = {
  ADMIN: "admin",
  SIMPLEUSER: "simpleuser",
};

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

module.exports = {
  subscrENUM: subscrENUM,
  emailRegexp: emailRegexp,
};
