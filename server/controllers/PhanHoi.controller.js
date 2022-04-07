const PhanHoiModel = require("../models/PhanHoi.model");

module.exports = {
    getAll: async (req, res) => {
        try {
            let PhanHois;
            const { groupBy, MaKhachSan } = req.query;

            //groupBy = "DiemDanhGia"
            if (groupBy) {
                const labelRange = ["Tuyệt hảo: 9 điểm trở lên", "Rất tốt: 8 điểm trở lên", "Tốt: 7 điểm trở lên", "Dễ chịu: 6 điểm trở lên"];
                let results = await PhanHoiModel.aggregate([
                    {
                        $group: {
                            _id: "$MaKhachSan",
                            TongSoPhanHoi: { $count: {} },
                            TongSoDiem: { $sum: "$Diem" },
                        },
                    },
                    {
                        $project: {
                            MaKhachSan: "$_id",
                            TongSoPhanHoi: "$TongSoPhanHoi",
                            TongSoDiem: "$TongSoDiem",
                            DiemTB: { $divide: ["$TongSoDiem", "$TongSoPhanHoi"] },

                        }
                    }
                    ,
                    {
                        $project: {
                            MaKhachSan: "$_id",
                            TongSoPhanHoi: "$TongSoPhanHoi",
                            TongSoDiem: "$TongSoDiem",
                            DiemTB: "$DiemTB",
                            // rangeLabel: {
                            //     $cond: [
                            //         { $gte: ["$DiemTB", 9] },
                            //         labelRange[0],
                            //         {
                            //             $cond: [
                            //                 { $gte: ["$DiemTB", 8] },
                            //                 labelRange[1],
                            //                 {
                            //                     $cond: [
                            //                         { $gte: ["$DiemTB", 7] },
                            //                         labelRange[2],
                            //                         {
                            //                             $cond: [
                            //                                 { $gte: ["$DiemTB", 6] },
                            //                                 labelRange[3],
                            //                                 ""
                            //                             ]
                            //                         }
                            //                     ]
                            //                 }
                            //             ]
                            //         }]
                            // }
                        }
                    }
                    ,
                ]);
                //handle grouby range 6 -> , 7-> , 8-> , 9-> 

                let newResults = [9, 8, 7, 6].map((score, index) => ({ _id: score, DiemDanhGia: labelRange[index], TongSo: results.filter(choNghi => choNghi.DiemTB >= score).length }));

                return res.json({ message: "success", results: newResults, type: `groupBy-${groupBy}` });

            }

            //get all PhanHoi via MaKhachSan
            if (MaKhachSan) {

                const { orderBy, _page = 1, _limit = 5 } = req.query;

                PhanHois = await PhanHoiModel.find({ MaKhachSan }).skip((_page - 1) * _limit).limit(_limit);
                return res.json({ message: "success", PhanHois, MaKhachSan, _page, _limit });
            }


            PhanHois = await PhanHoiModel.find();
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