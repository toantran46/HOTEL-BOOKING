const TinDungModel = require("../models/TinDung.model");

module.exports = {
    getAll: async (req, res) => {
        try {
            const TinDungs = await TinDungModel.find();
            res.json({ message: "success", TinDungs })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    get: async (req, res) => {
        try {
            const { MaTinDung } = req.params;
            const TinDung = await TinDungModel.findOne({ _id: MaTinDung });
            if (!TinDung) return res.status(400).json({ message: "Tín dụng không tồn tại !" });
            res.json({ message: "success", TinDung })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    post: async (req, res) => {
        try {
            const { TenTinDung, Logo } = req.body;
            const newTinDung = new TinDungModel({
                TenTinDung,
                Logo
            })
            await newTinDung.save();
            res.json({ message: "Thêm Tín dụng thành công !" })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    patch: async (req, res) => {
        try {
            const { MaTinDung } = req.params;

            const TinDung = await TinDungModel.updateOne({ _id: MaTinDung }, { ...req.body });
            if (TinDung.matchedCount === 0) return res.status(400).json({ message: "Tín dụng không tồn tại !" });

            res.json({ message: "Sửa Tín dụng thành công !" });
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const { MaTinDung } = req.params;
            const TinDung = await TinDungModel.deleteOne({ _id: MaTinDung });
            if (TinDung.deletedCount === 0) return res.status(400).json({ message: "Tín dụng không tồn tại !" });

            res.json({ message: "Xóa Tín dụng thành công !" })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
}