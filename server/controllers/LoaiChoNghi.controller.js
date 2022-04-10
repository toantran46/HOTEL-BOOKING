const LoaiChoNghiModel = require("../models/LoaiChoNghi.model");

module.exports = {
    getAll: async (req, res) => {
        try {
            let LoaiChoNghis;
            const { action } = req.query;

            //action = 'LoaiChoNghi' 
            if (action === 'getTotalPlace') {

                LoaiChoNghis = await LoaiChoNghiModel.aggregate([
                    { $lookup: { from: `chonghis`, localField: "_id", foreignField: "LoaiChoNghi", as: "ChoNghi" }, },
                    {
                        $project: {
                            _id: "$_id",
                            TenLoaiChoNghi: "$TenLoaiChoNghi",
                            HinhAnh: "$HinhAnh",
                            TongSo: { $size: "$ChoNghi" },
                        }
                    }
                ]);
                return res.json({ message: "success", LoaiChoNghis, type: `action-${action}` });

            }


            LoaiChoNghis = await LoaiChoNghiModel.find();
            res.json({ message: "success", LoaiChoNghis })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    get: async (req, res) => {
        try {
            const { MaLoaiChoNghi } = req.params;
            const LoaiChoNghi = await LoaiChoNghiModel.findOne({ _id: MaLoaiChoNghi });
            if (!LoaiChoNghi) return res.status(400).json({ message: "Loại chổ nghĩ không tồn tại !" });
            res.json({ message: "success", LoaiChoNghi })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    post: async (req, res) => {
        try {
            const { TenLoaiChoNghi } = req.body;
            const newLoaiChoNghi = new LoaiChoNghiModel({
                TenLoaiChoNghi, HinhAnh: "hinhanh" + Math.random()
            })
            await newLoaiChoNghi.save();
            res.json({ message: "Thêm Loại chổ nghĩ thành công !" })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    patch: async (req, res) => {
        try {
            const { TenLoaiChoNghi } = req.body;
            const { MaLoaiChoNghi } = req.params;

            const LoaiChoNghi = await LoaiChoNghiModel.updateOne({ _id: MaLoaiChoNghi }, { TenLoaiChoNghi });
            if (LoaiChoNghi.matchedCount === 0) return res.status(400).json({ message: "Loại chổ nghĩ không tồn tại !" });

            res.json({ message: "Sửa Loại chổ nghĩ thành công !" });
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const { MaLoaiChoNghi } = req.params;
            const LoaiChoNghi = await LoaiChoNghiModel.deleteOne({ _id: MaLoaiChoNghi });
            if (LoaiChoNghi.deletedCount === 0) return res.status(400).json({ message: "Loại chổ nghĩ không tồn tại !" });

            res.json({ message: "Xóa Loại chổ nghĩ thành công !" })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
}