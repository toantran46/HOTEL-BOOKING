const express = require("express");
const PhanHoiController = require("../controllers/PhanHoi.controller");
const router = express.Router();

router.get("/PhanHois", PhanHoiController.getAll);
router.get("/:MaPhanHoi", PhanHoiController.get);
router.post("/", PhanHoiController.post);
router.patch("/:MaPhanHoi", PhanHoiController.patch);
router.delete("/:MaPhanHoi", PhanHoiController.delete);


module.exports = router;