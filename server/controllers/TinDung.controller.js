const TinDungModel = require("../models/TinDung.model");
const { sendMail } = require("../sevices/mail");
const { destroy } = require("../utils/cloudinary.config");

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