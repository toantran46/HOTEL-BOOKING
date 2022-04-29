const express = require("express");
const LoaiChoNghiController = require("../controllers/LoaiChoNghi.controller");
const router = express.Router();
const upload = require("../utils/upload");

router.get("/LoaiChoNghis", LoaiChoNghiController.getAll);
router.get("/:MaLoaiChoNghi", LoaiChoNghiController.get);
router.post("/", upload.single("HinhAnh"), LoaiChoNghiController.post);
router.patch(
  "/:MaLoaiChoNghi",
  upload.single("HinhAnh"),
  LoaiChoNghiController.patch
);
router.delete("/:MaLoaiChoNghi", LoaiChoNghiController.delete);

module.exports = router;
