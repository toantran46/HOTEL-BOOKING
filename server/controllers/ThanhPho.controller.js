const ThanhPhoModel = require("../models/ThanhPho.model");

module.exports = {
    getAll: async (req, res) => {
        try {
            let ThanhPhos;
            const { action } = req.query;

            //action = 'getTotalPlace' 
            if (action === 'getTotalPlace') {

                ThanhPhos = await ThanhPhoModel.aggregate([
                    { $lookup: { from: `chonghis`, localField: "_id", foreignField: "ThanhPho", as: "ChoNghi" }, },
                    {
                        $project: {
                            _id: "$_id",
                            TenThanhPho: "$TenThanhPho",
                            HinhAnh: "$HinhAnh",
                            TongSo: { $size: "$ChoNghi" },
                        }
                    }, { $sort: { "TongSo": -1 } }

                ]);
                return res.json({ message: "success", ThanhPhos, type: `action-${action}` });

            }

            ThanhPhos = await ThanhPhoModel.find();
            res.json({ message: "success", ThanhPhos })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    get: async (req, res) => {
        try {
            const { MaThanhPho } = req.params;
            const ThanhPho = await ThanhPhoModel.findOne({ _id: MaThanhPho });
            if (!ThanhPho) return res.status(400).json({ message: "Thành phố không tồn tại !" });
            res.json({ message: "success", ThanhPho })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    post: async (req, res) => {
        try {
            const { TenThanhPho } = req.body;
            const newThanhPho = new ThanhPhoModel({
                TenThanhPho, HinhAnh: "hinhanh" + Math.random()
            })
            await newThanhPho.save();
            res.json({ message: "Thêm Thành phố thành công !" })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    patch: async (req, res) => {
        try {
            const { TenThanhPho } = req.body;
            const { MaThanhPho } = req.params;

            const ThanhPho = await ThanhPhoModel.updateOne({ _id: MaThanhPho }, { TenThanhPho });
            if (ThanhPho.matchedCount === 0) return res.status(400).json({ message: "Thành phố không tồn tại !" });

            res.json({ message: "Sửa Thành phố thành công !" });
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const { MaThanhPho } = req.params;
            const ThanhPho = await ThanhPhoModel.deleteOne({ _id: MaThanhPho });
            if (ThanhPho.deletedCount === 0) return res.status(400).json({ message: "Thành phố không tồn tại !" });

            res.json({ message: "Xóa Thành phố thành công !" })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
}