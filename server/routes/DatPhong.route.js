const express = require("express");
const DatPhongController = require("../controllers/DatPhong.controller");
const checkAuth = require('../middleware/checkAuth');
const router = express.Router();


router.get("/DatPhongs", checkAuth, DatPhongController.getAll);
router.get("/:MaDatPhong", checkAuth, DatPhongController.get);
router.post("/", DatPhongController.post);
router.patch("/:MaDatPhong", checkAuth, DatPhongController.patch);
router.delete("/:MaDatPhong", checkAuth, DatPhongController.delete);


module.exports = router;