const express = require("express");
const router = express.Router();

const controller = require("./profile.controller");

router.get("/profile/", controller.getAll);
router.post("/profile/", controller.submit);
router.put("/profile/", controller.update);

module.exports = router;
