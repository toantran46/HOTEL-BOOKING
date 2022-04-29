const TinDungModel = require("../models/TinDung.model");
const { sendMail } = require("../sevices/mail");
const { destroy } = require("../utils/cloudinary.config");

module.exports = {
    getAll: async (req, res) => {
        try {
            const { _page, _limit } = req.query;
            let TinDungs = await TinDungModel.find();

            //pagination
            const TongSo = TinDungs.length;
            const start = _page ? (_page - 1) * _limit : 0;
            const end = start + (_limit ? +_limit : TongSo);
            TinDungs = TinDungs.slice(start, end);
            return res.json({ message: "success", TinDungs, totalPage: Math.ceil(TongSo / _limit), _page: +_page, _limit: +_limit, total: TongSo });
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
            const { TenTinDung } = req.body;
            const Logo = req.file.path;

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
            const { TenTinDung } = req.body;

            const newLogo = req.file?.path
            const newData = newLogo ? { TenTinDung, Logo: newLogo } : { TenTinDung };

            // //remove old file
            // if (newLogo) {
            //     const oldFile = await TinDungModel.findById(MaTinDung);
            //     const oldFileName = oldFile.Logo.split("/").pop();
            //     const response = await destroy(process.env.CLOUD_FOLDER_UPLOAD, oldFile.Logo);
            //     console.log({ response })
            // }

            const TinDung = await TinDungModel.updateOne({ _id: MaTinDung }, { ...newData });
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