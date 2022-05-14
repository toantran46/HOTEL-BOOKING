const DatPhongModel = require("../models/DatPhong.model");
const PhanHoiModel = require("../models/PhanHoi.model");

module.exports = {
  getAll: async (req, res) => {
    try {
      let PhanHois;
      const { groupBy, MaKhachSan } = req.query;

      //groupBy = "DiemDanhGia"
      if (groupBy) {
        const labelRange = [
          "Tuyệt hảo: 9 điểm trở lên",
          "Rất tốt: 8 điểm trở lên",
          "Tốt: 7 điểm trở lên",
          "Dễ chịu: 6 điểm trở lên",
        ];
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
            },
          },
          {
            $project: {
              MaKhachSan: "$_id",
              TongSoPhanHoi: "$TongSoPhanHoi",
              TongSoDiem: "$TongSoDiem",
              DiemTB: "$DiemTB",
            },
          },
        ]);
        //handle grouby range 6 -> , 7-> , 8-> , 9->

        let newResults = [9, 8, 7, 6].map((score, index) => ({
          _id: score,
          DiemDanhGia: labelRange[index],
          TongSo: results.filter((choNghi) => choNghi.DiemTB >= score).length,
        }));

        return res.json({
          message: "success",
          PhanHois: newResults,
          type: `groupBy-${groupBy}`,
        });
      }

      //get all PhanHoi via MaKhachSan
      if (MaKhachSan) {
        const { orderBy, _page, _limit } = req.query;

        PhanHois = await PhanHoiModel.find({ MaKhachSan })
          .populate("MaKH", "_id name Avatar")
          .populate("MaPhong")
          .exec();
        //total found
        const TongSo = PhanHois.length;
        //pagination
        const start = _page ? (_page - 1) * _limit : 0;
        const end = start + (_limit ? +_limit : TongSo);
        //DiemTB
        const DiemTB =
          PhanHois.reduce((a, PhanHoi) => a + PhanHoi.Diem, 0) / TongSo;

        //check if have orderBy
        if (orderBy) {
          switch (orderBy) {
            case "latest":
              PhanHois = PhanHois.sort((a, b) => b.NgayTao - a.NgayTao);
              break;
            case "oldest":
              PhanHois = PhanHois.sort((a, b) => a.NgayTao - b.NgayTao);
              break;
            case "highest-score":
              PhanHois = PhanHois.sort((a, b) => b.Diem - a.Diem);
              break;
            case "lowest-score":
              PhanHois = PhanHois.sort((a, b) => a.Diem - b.Diem);
              break;
          }
        }

        PhanHois = PhanHois.slice(start, end);
        return res.json({
          message: "success",
          PhanHois,
          MaKhachSan,
          _page,
          _limit,
          _totalPage: Math.ceil(TongSo / _limit),
          TongSo,
          DiemTB,
          orderBy,
        });
      }

      PhanHois = await PhanHoiModel.find();
      res.json({ message: "success", PhanHois });
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
    }
  },
  get: async (req, res) => {
    try {
      const { MaPhanHoi } = req.params;
      const PhanHoi = await PhanHoiModel.findOne({ _id: MaPhanHoi });
      if (!PhanHoi)
        return res.status(400).json({ message: "Phản hồi không tồn tại !" });
      res.json({ message: "success", PhanHoi });
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
    }
  },
  post: async (req, res) => {
    try {
      const { MaKhachSan, MaKH, Diem, BinhLuan } = req.body;
      const email = req.user?.email;
      // console.log({ email })

      const Phong = await DatPhongModel.find({
        Email: email,
        MaKhachSan: MaKhachSan,
      }).sort({ NgayDatPhong: -1 });
      // console.log(Phong);
      // return;
      if (Phong.length === 0) {
        return res.status(404).json({ message: "Vui lòng đặt phòng trước khi bình luận" });
      }

      const PhongGanNhat = Phong[0];

      const newPhanHoi = new PhanHoiModel({
        MaKhachSan,
        MaKH,
        MaPhong: PhongGanNhat.ThongTinhPhong[0].Phong,
        Diem,
        BinhLuan,
      });
      await newPhanHoi.save();
      res.json({ message: "Thêm phản hồi thành công !" });
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
    }
  },
  patch: async (req, res) => {
    try {
      const { MaPhanHoi } = req.params;

      const PhanHoi = await PhanHoiModel.updateOne(
        { _id: MaPhanHoi },
        { ...req.body }
      );
      if (PhanHoi.matchedCount === 0)
        return res.status(400).json({ message: "Phản hồi không tồn tại !" });

      res.json({ message: "Sửa phản hồi thành công !" });
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { MaPhanHoi } = req.params;
      const PhanHoi = await PhanHoiModel.deleteOne({ _id: MaPhanHoi });
      if (PhanHoi.deletedCount === 0)
        return res.status(400).json({ message: "Phản hồi không tồn tại !" });

      res.json({ message: "Xóa phản hồi thành công !" });
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
    }
  },
};
