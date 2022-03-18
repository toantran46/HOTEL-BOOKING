const express = require("express");
const LoaiGiuongController = require("../controllers/LoaiGiuong.controller");
const router = express.Router();

router.get("/LoaiGiuongs", LoaiGiuongController.getAll);
router.get("/:MaLoaiGiuong", LoaiGiuongController.get);
router.post("/", LoaiGiuongController.post);
router.patch("/:MaLoaiGiuong", LoaiGiuongController.patch);
router.delete("/:MaLoaiGiuong", LoaiGiuongController.delete);


module.exports = router;