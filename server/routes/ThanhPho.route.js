const express = require("express");
const ThanhPhoController = require("../controllers/ThanhPho.controller");
const upload = require("../utils/upload");
const router = express.Router();

router.get("/ThanhPhos", ThanhPhoController.getAll);
router.get("/:MaThanhPho", ThanhPhoController.get);
router.post("/", upload.single("HinhAnh"), ThanhPhoController.post);
router.patch("/:MaThanhPho", upload.single("HinhAnh"), ThanhPhoController.patch);
router.delete("/:MaThanhPho", ThanhPhoController.delete);


module.exports = router;