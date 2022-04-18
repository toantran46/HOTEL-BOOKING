const DatPhongModel = require("../models/DatPhong.model");

module.exports = {
    getAll: async (req, res) => {
        try {
            const DatPhongs = await DatPhongModel.find();
            res.json({ message: "success", DatPhongs })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    get: async (req, res) => {
        try {
            const { MaDatPhong } = req.params;
            const DatPhong = await DatPhongModel.findOne({ _id: MaDatPhong });
            if (!DatPhong) return res.status(400).json({ message: "Đặt phòng không tồn tại !" });
            res.json({ message: "success", DatPhong })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    post: async (req, res) => {
        try {
            const {
                ThongTinPhong,
                HoTenNguoiDat,
                Email,
                YeuCau,
                MaKhachSan,
                NgayNhanPhong,
                NgayTraPhong,
                TongTien,
                SoDienThoai,
                TinDung,
                ThoiGianDenDuKien
            } = req.body;

            const newDatPhong = new DatPhongModel({
                ThongTinhPhong: ThongTinPhong,
                HoTenNguoiDat,
                Email,
                YeuCau,
                MaKhachSan,
                NgayNhanPhong,
                NgayTraPhong,
                TongTien,
                SoDienThoai,
                TinDung,
                ThoiGianDenDuKien
            })
            await newDatPhong.save();
            res.json({ message: "Đặt phòng thành công! Mong quý khách đến đúng hẹn và có 1 kì nghĩ tuyệt vời !" })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
            console.log(error.message);
        }
    },
    patch: async (req, res) => {
        try {
            const { MaDatPhong } = req.params;

            const DatPhong = await DatPhongModel.updateOne({ _id: MaDatPhong }, { ...req.body });
            if (DatPhong.matchedCount === 0) return res.status(400).json({ message: "Đặt phòng không tồn tại !" });

            res.json({ message: "Sửa đặt phòng thành công !" });
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const { MaDatPhong } = req.params;
            const DatPhong = await DatPhongModel.deleteOne({ _id: MaDatPhong });
            if (DatPhong.deletedCount === 0) return res.status(400).json({ message: "Đặt phòng không tồn tại !" });

            res.json({ message: "Xóa đặt phòng thành công !" })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
}