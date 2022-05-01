const ThanhPhoModel = require("../models/ThanhPho.model");
const { upload } = require("../utils/cloudinary.config");

module.exports = {
    getAll: async (req, res) => {
        try {
            const { _page, _limit, action, search } = req.query;
            let ThanhPhos;

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
            //search 
            if (search) {

                ThanhPhos = await ThanhPhoModel.aggregate([
                    {
                        $match: search ? { "TenThanhPho": new RegExp(search, "i") } : {},
                    }, { $limit: +_limit }
                ]);

                console.log({ search, ThanhPhos });
                return res.json({ message: "success", ThanhPhos, type: `search-${search}` });

            }

            ThanhPhos = await ThanhPhoModel.find();
            //pagination
            const TongSo = ThanhPhos.length;
            const start = _page ? (_page - 1) * _limit : 0;
            const end = start + (_limit ? +_limit : TongSo);
            ThanhPhos = ThanhPhos.slice(start, end);
            return res.json({ message: "success", ThanhPhos, totalPage: Math.ceil(TongSo / _limit), _page: +_page, _limit: +_limit, total: TongSo });
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
                TenThanhPho, HinhAnh: req.file.path
            })
            await newThanhPho.save();
            res.json({ message: "Thêm Thành phố thành công !" })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    patch: async (req, res) => {
        try {
            const { MaThanhPho } = req.params;
            const { TenThanhPho } = req.body;
            const HinhAnh = req.file?.path;
            const newData = HinhAnh ? { TenThanhPho, HinhAnh } : { TenThanhPho }

            const ThanhPho = await ThanhPhoModel.updateOne({ _id: MaThanhPho }, { ...newData });
            if (ThanhPho.matchedCount === 0) return res.status(400).json({ message: "Thành phố không tồn tại !" });

            res.json({ message: "Sửa Thành phố thành công !" });
        } catch (error) {
            res.status(500).json({ message: "error" + error })
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