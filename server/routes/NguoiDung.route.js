const express = require("express");
const NguoiDungController = require("../controllers/NguoiDung.controller");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');

router.get("/NguoiDungs", NguoiDungController.getAll);
router.get("/:MaNguoiDung", checkAuth, NguoiDungController.get);
router.get("/", checkAuth, NguoiDungController.getMe);
router.post("/", NguoiDungController.post);
router.patch("/:MaNguoiDung", NguoiDungController.patch);
router.delete("/:MaNguoiDung", NguoiDungController.delete);


module.exports = router;