const express = require("express");
const ChoNghiController = require("../controllers/ChoNghi.controller");
const checkAuth = require("../middleware/checkAuth");
const router = express.Router();
const upload = require("../utils/upload.js");

router.get("/ChoNghis", ChoNghiController.getAll);
router.get("/:MaChoNghi", ChoNghiController.get);
router.post("/", checkAuth, upload.array("photos", 12), ChoNghiController.post);
router.patch("/:MaChoNghi", checkAuth, upload.array("HinhAnh", 12), ChoNghiController.patch);
router.delete("/:MaChoNghi", ChoNghiController.delete);

module.exports = router;
