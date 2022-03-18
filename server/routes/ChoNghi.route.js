const express = require("express");
const ChoNghiController = require("../controllers/ChoNghi.controller");
const router = express.Router();

router.get("/ChoNghis", ChoNghiController.getAll);
router.get("/:MaChoNghi", ChoNghiController.get);
router.post("/", ChoNghiController.post);
router.patch("/:MaChoNghi", ChoNghiController.patch);
router.delete("/:MaChoNghi", ChoNghiController.delete);


module.exports = router;