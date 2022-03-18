const express = require("express");
const DatPhongController = require("../controllers/DatPhong.controller");
const router = express.Router();

router.get("/DatPhongs", DatPhongController.getAll);
router.get("/:MaDatPhong", DatPhongController.get);
router.post("/", DatPhongController.post);
router.patch("/:MaDatPhong", DatPhongController.patch);
router.delete("/:MaDatPhong", DatPhongController.delete);


module.exports = router;