const { default: mongoose } = require("mongoose");
const ChoNghiModel = require("../models/ChoNghi.model");

module.exports = {
    getAll: async (req, res) => {
        try {
            const ChoNghis = await ChoNghiModel.find().populate("TienNghi").populate("Phong").populate("TinDung")
                .populate({
                    path: "Phong",
                    populate: [
                        {
                            path: "LoaiPhong",
                            model: "LoaiPhong"
                        },
                        {
                            path: "Giuong",
                            model: "LoaiGiuong"
                        },
                        {
                            path: "TienNghi",
                            model: "TienNghi"
                        },
                    ]
                }).exec();
            res.json({ message: "success", ChoNghis })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    get: async (req, res) => {
        try {
            const { MaChoNghi } = req.params;
            const ChoNghi = await ChoNghiModel.findOne({ _id: MaChoNghi }).populate("TienNghi").populate("Phong").populate("TinDung")
                .populate({
                    path: "Phong",
                    populate: [
                        {
                            path: "LoaiPhong",
                            model: "LoaiPhong"
                        },
                        {
                            path: "Giuong",
                            model: "LoaiGiuong"
                        },
                        {
                            path: "TienNghi",
                            model: "TienNghi"
                        },
                    ]
                }).exec();
            if (!ChoNghi) return res.status(400).json({ message: "Chổ nghỉ không tồn tại !" });
            res.json({ message: "success", ChoNghi })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    post: async (req, res) => {
        try {
            const {
                TenChoNghi,
                TenNguoiLienHe,
                SoDienThoai,
                DiaChi,
                ThanhPho,
                XepHang,
                TienNghi,
                Phong,
                HuyDatPhong,
                BaoHiemNhamLan,
                ThoiGianNhanPhong,
                ThoiGianTraPhong,
                TinDung
            } = req.body;

            //avatar
            const HinhAnh = ['link-anh1', 'link-anh2', 'link-anh3'];
            const newChoNghi = new ChoNghiModel({
                TenChoNghi,
                TenNguoiLienHe,
                SoDienThoai,
                DiaChi,
                ThanhPho,
                XepHang,
                TienNghi,
                HinhAnh,
                Phong,
                HuyDatPhong,
                BaoHiemNhamLan,
                ThoiGianNhanPhong,
                ThoiGianTraPhong,
                TinDung
            })
            await newChoNghi.save();
            res.json({ message: "Thêm Chổ nghỉ thành công !" })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    patch: async (req, res) => {
        try {
            const { MaChoNghi } = req.params;

            const ChoNghi = await ChoNghiModel.updateOne({ _id: MaChoNghi }, { ...req.body });
            if (ChoNghi.matchedCount === 0) return res.status(400).json({ message: "Chổ nghỉ không tồn tại !" });

            res.json({ message: "Sửa Chổ nghỉ thành công !" });
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const { MaChoNghi } = req.params;
            const ChoNghi = await ChoNghiModel.deleteOne({ _id: MaChoNghi });
            if (ChoNghi.deletedCount === 0) return res.status(400).json({ message: "Chổ nghỉ không tồn tại !" });

            res.json({ message: "Xóa Chổ nghỉ thành công !" })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
}