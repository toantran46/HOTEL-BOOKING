const LoaiPhongModel = require("../models/LoaiPhong.model");

module.exports = {
    getAll: async (req, res) => {
        try {
            const LoaiPhongs = await LoaiPhongModel.find();
            res.json({ message: "success", LoaiPhongs })
        } catch (error) {
            res.status(500).json({ message: "error", error })
        }
    },
    get: async (req, res) => {
        try {
            const { MaLoaiPhong } = req.params;
            const LoaiPhong = await LoaiPhongModel.findOne({ _id: MaLoaiPhong });
            if (!LoaiPhong) return res.status(400).json({ message: "Loại phòng không tồn tại !" });
            res.json({ message: "success", LoaiPhong })
        } catch (error) {
            res.status(500).json({ message: "error", error })
        }
    },
    post: async (req, res) => {
        try {
            const { TenLoaiPhong } = req.body;
            const newLoaiPhong = new LoaiPhongModel({
                TenLoaiPhong
            })
            await newLoaiPhong.save();
            res.json({ message: "Thêm loại phòng thành công !" })
        } catch (error) {
            res.status(500).json({ message: "error", error })
        }
    },
    patch: async (req, res) => {
        try {
            const { TenLoaiPhong } = req.body;
            const { MaLoaiPhong } = req.params;

            const LoaiPhong = await LoaiPhongModel.updateOne({ _id: MaLoaiPhong }, { TenLoaiPhong });
            if (LoaiPhong.matchedCount === 0) return res.status(400).json({ message: "Loại phòng không tồn tại !" });

            res.json({ message: "Sửa loại phòng thành công !" });
        } catch (error) {
            res.status(500).json({ message: "error", error })
        }
    },
    delete: async (req, res) => {
        try {
            const { MaLoaiPhong } = req.params;
            const LoaiPhong = await LoaiPhongModel.deleteOne({ _id: MaLoaiPhong });
            if (LoaiPhong.deletedCount === 0) return res.status(400).json({ message: "Loại phòng không tồn tại !" });

            res.json({ message: "Xóa loại phòng thành công !" })
        } catch (error) {
            res.status(500).json({ message: "error", error })
        }
    },
}