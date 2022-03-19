const express = require("express");
const LoaiChoNghiController = require("../controllers/LoaiChoNghi.controller");
const router = express.Router();

router.get("/LoaiChoNghis", LoaiChoNghiController.getAll);
router.get("/:MaLoaiChoNghi", LoaiChoNghiController.get);
router.post("/", LoaiChoNghiController.post);
router.patch("/:MaLoaiChoNghi", LoaiChoNghiController.patch);
router.delete("/:MaLoaiChoNghi", LoaiChoNghiController.delete);


module.exports = router;