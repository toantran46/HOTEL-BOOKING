const PhanHoiModel = require("../models/PhanHoi.model");

module.exports = {
    getAll: async (req, res) => {
        try {
            const PhanHois = await PhanHoiModel.find();
            res.json({ message: "success", PhanHois })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    get: async (req, res) => {
        try {
            const { MaPhanHoi } = req.params;
            const PhanHoi = await PhanHoiModel.findOne({ _id: MaPhanHoi });
            if (!PhanHoi) return res.status(400).json({ message: "Phản hồi không tồn tại !" });
            res.json({ message: "success", PhanHoi })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    post: async (req, res) => {
        try {
            const {
                MaKhachSan,
                MaKH,
                MaPhong,
                NgayTao,
                Diem,
                BinhLuan,
                TraLoi
            } = req.body;

            const newPhanHoi = new PhanHoiModel({
                MaKhachSan,
                MaKH,
                MaPhong,
                NgayTao,
                Diem,
                BinhLuan,
                TraLoi
            })
            await newPhanHoi.save();
            res.json({ message: "Thêm phản hồi thành công !" })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    patch: async (req, res) => {
        try {
            const { MaPhanHoi } = req.params;

            const PhanHoi = await PhanHoiModel.updateOne({ _id: MaPhanHoi }, { ...req.body });
            if (PhanHoi.matchedCount === 0) return res.status(400).json({ message: "Phản hồi không tồn tại !" });

            res.json({ message: "Sửa phản hồi thành công !" });
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const { MaPhanHoi } = req.params;
            const PhanHoi = await PhanHoiModel.deleteOne({ _id: MaPhanHoi });
            if (PhanHoi.deletedCount === 0) return res.status(400).json({ message: "Phản hồi không tồn tại !" });

            res.json({ message: "Xóa phản hồi thành công !" })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
}