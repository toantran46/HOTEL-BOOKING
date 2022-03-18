const { default: mongoose } = require("mongoose");
const PhongModel = require("../models/Phong.model");

module.exports = {
    getAll: async (req, res) => {
        try {
            const Phongs = await PhongModel.find().populate("LoaiPhong").populate("Giuong").populate("TienNghi").exec();
            res.json({ message: "success", Phongs })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    get: async (req, res) => {
        try {
            const { MaPhong } = req.params;
            const Phong = await PhongModel.findOne({ _id: MaPhong }).populate("LoaiPhong").populate("Giuong").populate("TienNghi").exec();
            if (!Phong) return res.status(400).json({ message: "Phòng không tồn tại !" });
            res.json({ message: "success", Phong })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    post: async (req, res) => {
        try {
            const { LoaiPhong,
                TenPhong,
                HutThuoc,
                Giuong,
                SoLuongKhach,
                KichThuoc,
                Gia,
                TrangThai,
                TienNghi,
                SoLuongPhong } = req.body;
            //test
            const newPhong = new PhongModel({
                LoaiPhong,
                TenPhong,
                HutThuoc,
                Giuong,
                SoLuongKhach,
                KichThuoc,
                Gia,
                TrangThai,
                TienNghi,
                SoLuongPhong
            })
            await newPhong.save();
            res.json({ message: "Thêm Phòng thành công !", MaPhong: newPhong._id })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    patch: async (req, res) => {
        try {
            const { MaPhong } = req.params;

            const Phong = await PhongModel.updateOne({ _id: MaPhong }, { ...req.body });
            if (Phong.matchedCount === 0) return res.status(400).json({ message: "Phòng không tồn tại !" });

            res.json({ message: "Sửa Phòng thành công !" });
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const { MaPhong } = req.params;
            const Phong = await PhongModel.deleteOne({ _id: MaPhong });
            if (Phong.deletedCount === 0) return res.status(400).json({ message: "Phòng không tồn tại !" });

            res.json({ message: "Xóa Phòng thành công !" })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
}