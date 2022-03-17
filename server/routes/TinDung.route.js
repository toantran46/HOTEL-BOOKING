const express = require("express");
const TinDungController = require("../controllers/TinDung.controller");
const router = express.Router();

router.get("/TinDungs", TinDungController.getAll);
router.get("/:MaTinDung", TinDungController.get);
router.post("/", TinDungController.post);
router.patch("/:MaTinDung", TinDungController.patch);
router.delete("/:MaTinDung", TinDungController.delete);


module.exports = router;