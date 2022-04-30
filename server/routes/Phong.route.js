const express = require("express");
const PhongController = require("../controllers/Phong.controller");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");


router.get("/Phongs", PhongController.getAll);
router.get("/:chonghi/Phongtrong", PhongController.getEmptyRoom);
router.get("/:MaPhong", PhongController.get);
router.post("/", PhongController.post);
router.patch("/:MaPhong", checkAuth, PhongController.patch);
router.delete("/:MaPhong", PhongController.delete);

module.exports = router;
