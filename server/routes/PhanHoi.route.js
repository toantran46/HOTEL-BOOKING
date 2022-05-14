const express = require("express");
const PhanHoiController = require("../controllers/PhanHoi.controller");
const checkAuth = require('../middleware/checkAuth');

const router = express.Router();

router.get("/PhanHois", PhanHoiController.getAll);
router.get("/:MaPhanHoi", PhanHoiController.get);
router.post("/", checkAuth, PhanHoiController.post);
router.patch("/:MaPhanHoi", checkAuth, PhanHoiController.patch);
router.delete("/:MaPhanHoi", checkAuth, PhanHoiController.delete);


module.exports = router;