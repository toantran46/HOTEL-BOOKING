const express = require("express");
const router = express.Router();

router.get("/ChoNghis", (req, res) => res.send("ok"));
router.get("/:MaChoNghi", (req, res) => res.send("ok"));
router.post("/", (req, res) => res.send("ok"));
router.patch("/:MaChoNghi", (req, res) => res.send("ok"));
router.delete("/:MaChoNghi", (req, res) => res.send("ok"));


module.exports = router;