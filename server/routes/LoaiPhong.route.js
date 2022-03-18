const express = require("express");
const LoaiPhongController = require("../controllers/LoaiPhong.controller");
const router = express.Router();

router.get("/LoaiPhongs", LoaiPhongController.getAll);
router.get("/:MaLoaiPhong", LoaiPhongController.get);
router.post("/", LoaiPhongController.post);
router.patch("/:MaLoaiPhong", LoaiPhongController.patch);
router.delete("/:MaLoaiPhong", LoaiPhongController.delete);


module.exports = router;