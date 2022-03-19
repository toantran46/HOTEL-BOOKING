const express = require("express");
const ThanhPhoController = require("../controllers/ThanhPho.controller");
const router = express.Router();

router.get("/ThanhPhos", ThanhPhoController.getAll);
router.get("/:MaThanhPho", ThanhPhoController.get);
router.post("/", ThanhPhoController.post);
router.patch("/:MaThanhPho", ThanhPhoController.patch);
router.delete("/:MaThanhPho", ThanhPhoController.delete);


module.exports = router;