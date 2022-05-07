const express = require("express");
const NguoiDungController = require("../controllers/NguoiDung.controller");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const upload = require('../utils/upload');

router.get("/NguoiDungs", checkAuth, NguoiDungController.getAll);
router.get("/:MaNguoiDung", checkAuth, NguoiDungController.get);
router.get("/", checkAuth, NguoiDungController.getMe);
router.post("/", upload.single("Avatar"), NguoiDungController.post);
router.patch("/:MaNguoiDung", checkAuth, upload.single("Avatar"), NguoiDungController.patch);
router.delete("/:MaNguoiDung", NguoiDungController.delete);


module.exports = router;