const express = require("express");
const router = express.Router();

router.get("/TienNghis", (req, res) => res.send("ok"));
router.get("/:MaTienNghi", (req, res) => res.send("ok"));
router.post("/", (req, res) => res.send("ok"));
router.patch("/:MaTienNghi", (req, res) => res.send("ok"));
router.delete("/:MaTienNghi", (req, res) => res.send("ok"));


module.exports = router;