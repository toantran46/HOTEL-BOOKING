const TienNghiModel = require("../models/TienNghi.model");

module.exports = {
    getAll: async (req, res) => {
        try {
            const { groupBy, _page, _limit } = req.query;
            let TienNghis;

            if (groupBy) {

                TienNghis = await TienNghiModel.aggregate([
                    {
                        $group: {
                            _id: `$_id`,
                            TenTienNghi: { "$first": "$TenTienNghi" },
                        }
                    }
                    ,
                    {
                        $lookup: {
                            from: `chonghis`,
                            localField: "_id",
                            foreignField: "TienNghi",
                            as: "ChoNghi",
                        },
                    },

                    {
                        $project: {
                            _id: "$_id",
                            TenTienNghi: "$TenTienNghi",
                            TongSo: { $size: "$ChoNghi" }
                        }
                    }
                ]);
                return res.json({ message: "success", TienNghis, type: `groupBy-${groupBy}` });

            }


            TienNghis = await TienNghiModel.find();
            //pagination
            const TongSo = TienNghis.length;
            const start = _page ? (_page - 1) * _limit : 0;
            const end = start + (_limit ? +_limit : TongSo);
            TienNghis = TienNghis.slice(start, end);
            return res.json({ message: "success", TienNghis, totalPage: Math.ceil(TongSo / _limit), _page: +_page, _limit: +_limit, total: TongSo });
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    get: async (req, res) => {
        try {
            const { MaTienNghi } = req.params;
            const TienNghi = await TienNghiModel.findOne({ _id: MaTienNghi });
            if (!TienNghi) return res.status(400).json({ message: "Tiện nghi không tồn tại !" });
            res.json({ message: "success", TienNghi })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    post: async (req, res) => {
        try {
            const { TenTienNghi, Icon } = req.body;
            const newTienNghi = new TienNghiModel({
                TenTienNghi,
                Icon
            })
            await newTienNghi.save();
            res.json({ message: "Thêm tiện nghi thành công !" })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    patch: async (req, res) => {
        try {
            const { MaTienNghi } = req.params;

            const TienNghi = await TienNghiModel.updateOne({ _id: MaTienNghi }, { ...req.body });
            if (TienNghi.matchedCount === 0) return res.status(400).json({ message: "Tiện nghi không tồn tại !" });

            res.json({ message: "Sửa tiện nghi thành công !" });
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const { MaTienNghi } = req.params;
            const TienNghi = await TienNghiModel.deleteOne({ _id: MaTienNghi });
            if (TienNghi.deletedCount === 0) return res.status(400).json({ message: "Tiện nghi không tồn tại !" });

            res.json({ message: "Xóa tiện nghi thành công !" })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
}