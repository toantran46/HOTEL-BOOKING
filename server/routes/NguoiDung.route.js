const express = require("express");
const NguoiDungController = require("../controllers/NguoiDung.controller");
const router = express.Router();

router.get("/NguoiDungs", NguoiDungController.getAll);
router.get("/:MaNguoiDung", NguoiDungController.get);
router.post("/", NguoiDungController.post);
router.patch("/:MaNguoiDung", NguoiDungController.patch);
router.delete("/:MaNguoiDung", NguoiDungController.delete);


module.exports = router;