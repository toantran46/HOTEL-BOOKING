const express = require("express");
const TinDungController = require("../controllers/TinDung.controller");
const upload = require("../utils/upload");
const router = express.Router();

router.get("/TinDungs", TinDungController.getAll);
router.get("/:MaTinDung", TinDungController.get);
router.post("/", upload.single("Logo"), TinDungController.post);
router.patch("/:MaTinDung", upload.single("Logo"), TinDungController.patch);
router.delete("/:MaTinDung", TinDungController.delete);


module.exports = router;