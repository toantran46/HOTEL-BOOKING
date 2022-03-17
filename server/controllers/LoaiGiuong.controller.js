const LoaiGiuongModel = require("../models/LoaiGiuong.model");

module.exports = {
    getAll: async (req, res) => {
        try {
            const LoaiGiuongs = await LoaiGiuongModel.find();
            res.json({ message: "success", LoaiGiuongs })
        } catch (error) {
            res.status(500).json({ message: "error", error })
        }
    },
    get: async (req, res) => {
        try {
            const { MaLoaiGiuong } = req.params;
            const LoaiGiuong = await LoaiGiuongModel.findOne({ _id: MaLoaiGiuong });
            if (!LoaiGiuong) return res.status(400).json({ message: "Loại giường không tồn tại !" });
            res.json({ message: "success", LoaiGiuong })
        } catch (error) {
            res.status(500).json({ message: "error", error })
        }
    },
    post: async (req, res) => {
        try {
            const { TenLoaiGiuong } = req.body;
            const newLoaiGiuong = new LoaiGiuongModel({
                TenLoaiGiuong
            })
            await newLoaiGiuong.save();
            res.json({ message: "Thêm loại giường thành công !" })
        } catch (error) {
            res.status(500).json({ message: "error", error })
        }
    },
    patch: async (req, res) => {
        try {
            const { TenLoaiGiuong } = req.body;
            const { MaLoaiGiuong } = req.params;

            const LoaiGiuong = await LoaiGiuongModel.updateOne({ _id: MaLoaiGiuong }, { TenLoaiGiuong });
            if (LoaiGiuong.matchedCount === 0) return res.status(400).json({ message: "Loại giường không tồn tại !" });

            res.json({ message: "Sửa loại giường thành công !" });
        } catch (error) {
            res.status(500).json({ message: "error", error })
        }
    },
    delete: async (req, res) => {
        try {
            const { MaLoaiGiuong } = req.params;
            const LoaiGiuong = await LoaiGiuongModel.deleteOne({ _id: MaLoaiGiuong });
            if (LoaiGiuong.deletedCount === 0) return res.status(400).json({ message: "Loại giường không tồn tại !" });

            res.json({ message: "Xóa loại giường thành công !" })
        } catch (error) {
            res.status(500).json({ message: "error", error })
        }
    },
}