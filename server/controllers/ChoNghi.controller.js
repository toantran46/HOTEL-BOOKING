const { default: mongoose } = require("mongoose");
const ChoNghiModel = require("../models/ChoNghi.model");

module.exports = {
    getAll: async (req, res) => {
        try {
            let ChoNghis;
            // Group by city : data for home page 
            const { groupBy, _limit, _page, search, filter } = req.query;


            //groupBy = 'Thanh Pho' 'LoaiChoNghi 
            if (groupBy) {

                ChoNghis = await ChoNghiModel.aggregate([
                    {
                        $group: {
                            _id: `$${groupBy}`,
                            TongSo: { $count: {} }
                        }
                    }
                    ,
                    {
                        $lookup: {
                            from: `${groupBy.toLowerCase()}s`,
                            localField: "_id",
                            foreignField: "_id",
                            as: `${groupBy}`
                        },
                    },
                    {
                        $project: {
                            [groupBy]: { $cond: [{ $ne: [groupBy, "XepHang"] }, { "$arrayElemAt": [`$${groupBy}`, 0] }, "$_id"] },
                            TongSo: "$TongSo",

                        }
                    }
                ]);
                return res.json({ message: "success", ChoNghis, type: `groupBy-${groupBy}` });

            }
            //Get all ( search + pagination )
            const _totalPage = await ChoNghiModel.find();
            ChoNghis = await ChoNghiModel.find(search ? { $or: mongoose.Types.ObjectId.isValid(search) ? [{ ThanhPho: search }, { LoaiChoNghi: search }] : [{ TenChoNghi: { $regex: search } }] } : {})
                .populate("ThanhPho")
                .populate("LoaiChoNghi")
                .populate("TienNghi")
                .populate("Phong")
                .populate("TinDung")
                .populate({
                    path: "Phong",
                    populate: [
                        {
                            path: "LoaiPhong",
                            model: "LoaiPhong"
                        },
                        {
                            path: "ThongTinGiuong.Giuong",
                            model: "LoaiGiuong"
                        },
                        {
                            path: "TienNghi",
                            model: "TienNghi"
                        },
                    ]
                }).skip((_page - 1) * _limit).limit(_limit).exec();
            res.json({
                message: "success",
                ChoNghis,
                _page: parseInt(_page),
                _limit: parseInt(_limit),
                _totalPage: Math.ceil(_totalPage.length / _limit),
                search
            })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    get: async (req, res) => {
        try {
            const { MaChoNghi } = req.params;
            const ChoNghi = await ChoNghiModel.findOne({ _id: MaChoNghi })
                .populate("ThanhPho")
                .populate("LoaiChoNghi")
                .populate("TienNghi")
                .populate("Phong")
                .populate("TinDung")
                .populate({
                    path: "Phong",
                    populate: [
                        {
                            path: "LoaiPhong",
                            model: "LoaiPhong"
                        },
                        {
                            path: "ThongTinGiuong.Giuong",
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