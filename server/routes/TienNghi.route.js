const express = require("express");
const TienNghiController = require("../controllers/TienNghi.controller");
const router = express.Router();

router.get("/TienNghis", TienNghiController.getAll);
router.get("/:MaTienNghi", TienNghiController.get);
router.post("/", TienNghiController.post);
router.patch("/:MaTienNghi", TienNghiController.patch);
router.delete("/:MaTienNghi", TienNghiController.delete);


module.exports = router;