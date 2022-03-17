const express = require("express");
const router = express.Router();

router.get("/Phongs", (req, res) => res.send("ok"));
router.get("/:MaPhong", (req, res) => res.send("ok"));
router.post("/", (req, res) => res.send("ok"));
router.patch("/:MaPhong", (req, res) => res.send("ok"));
router.delete("/:MaPhong", (req, res) => res.send("ok"));


module.exports = router;