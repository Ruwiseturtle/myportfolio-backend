const express = require("express"); // створюємо веб-сервер

const router = express.Router(); // створюємо router (це як записна книга, де по шляху можна побачити, що потрібно робити)

const ctrl = require("../../controllers/projects");

// const { validateBody, isValidId, authenticate } = require("../../middleswares");

router.get("/", ctrl.getAll);

module.exports = router;