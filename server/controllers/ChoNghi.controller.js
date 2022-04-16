const { default: mongoose } = require("mongoose");
const ChoNghiModel = require("../models/ChoNghi.model");

function getMin(arr) {
  return arr.sort((a, b) => a - b)[0];
}

function findTienNghi(TienNghiFilter, TienNghiChoNghi) {
  return TienNghiChoNghi.find(item => TienNghiFilter.includes(item._id.toString())) ? true : false;
}


module.exports = {
  getAll: async (req, res) => {
    try {
      let ChoNghis;
      // Group by city : data for home page 
      let { groupBy, _limit, _page, search, filter, filterV2, value, _idCity } = req.query;


      // filter : LoaiChoNghi , XepHang ,DiemDanhGia, TienNghi
      if (filter) {
        filter = JSON.parse(filter)
        ChoNghis = await ChoNghiModel.aggregate([
          { $match: _idCity ? { ThanhPho: mongoose.Types.ObjectId(_idCity) } : {} },
          { $lookup: { from: 'phanhois', localField: "_id", foreignField: "MaKhachSan", as: `PhanHoi` } },
          { $addFields: { "DiemTB": { $divide: [{ "$sum": "$PhanHoi.Diem" }, { "$size": "$PhanHoi" }] } } },
          { $lookup: { from: 'thanhphos', localField: "ThanhPho", foreignField: "_id", as: `ThanhPho` } },
          { $lookup: { from: 'tiennghis', localField: "TienNghi", foreignField: "_id", as: `TienNghi` } },
          { $lookup: { from: 'loaichonghis', localField: "LoaiChoNghi", foreignField: "_id", as: `LoaiChoNghi` } },
          { $lookup: { from: 'phongs', localField: "Phong", foreignField: "_id", as: `Phong` } },
          { $lookup: { from: 'tindungs', localField: "TinDung", foreignField: "_id", as: `TinDung` } },
        ]);

        ChoNghis = ChoNghis.filter(ChoNghi => filter.LoaiChoNghi.length > 0 ? filter.LoaiChoNghi.includes(ChoNghi.LoaiChoNghi[0]._id.toString()) : true)
          .filter(ChoNghi => filter.XepHang.length > 0 ? filter.XepHang.includes(ChoNghi.XepHang) : true)
          .filter(ChoNghi => filter.DiemDanhGia.length > 0 ? ChoNghi.DiemTB >= getMin(filter.DiemDanhGia) : true)
          .filter(ChoNghi => filter.TienNghi.length > 0 ? findTienNghi(filter.TienNghi, ChoNghi.TienNghi) : true)

        //total found
        const TongSo = ChoNghis.length;
        //pagination
        const start = _page ? (_page - 1) * _limit : 0;
        const end = start + (_limit ? +_limit : TongSo);
        ChoNghis = ChoNghis.slice(start, end);

        return res.json({ message: "success", ChoNghis, type: `filter-${filter}`, _page: +_page, _limit: +_limit, TongSo, _totalPage: _limit ? Math.ceil(TongSo / _limit) : 1 });


      }

      if (filterV2) {
        switch (filterV2) {
          case "DiemDanhGia": {
            ChoNghis = await ChoNghiModel.aggregate([
              { $lookup: { from: 'phanhois', localField: "_id", foreignField: "MaKhachSan", as: `PhanHoi` } },
              { $addFields: { "DiemTB": { $divide: [{ "$sum": "$PhanHoi.Diem" }, { "$size": "$PhanHoi" }] } } },
              { $match: { "DiemTB": { $gte: value * 1 } } },
              { $lookup: { from: 'thanhphos', localField: "ThanhPho", foreignField: "_id", as: `ThanhPho` } },
              { $lookup: { from: 'tiennghis', localField: "TienNghi", foreignField: "_id", as: `TienNghi` } },
              { $lookup: { from: 'loaichonghis', localField: "LoaiChoNghi", foreignField: "_id", as: `LoaiChoNghi` } },
              { $lookup: { from: 'phongs', localField: "Phong", foreignField: "_id", as: `Phong` } },
              { $lookup: { from: 'tindungs', localField: "TinDung", foreignField: "_id", as: `TinDung` } },
            ]);
            break;
          }
          case "TienNghi": {
            ChoNghis = await ChoNghiModel.aggregate([
              { $lookup: { from: 'phanhois', localField: "_id", foreignField: "MaKhachSan", as: `PhanHoi` } },
              { $addFields: { "DiemTB": { $divide: [{ "$sum": "$PhanHoi.Diem" }, { "$size": "$PhanHoi" }] } } },
              { "$match": { "$expr": { "$in": [{ $toObjectId: value }, "$TienNghi"] } } },
              { $lookup: { from: 'thanhphos', localField: "ThanhPho", foreignField: "_id", as: `ThanhPho` } },
              { $lookup: { from: 'tiennghis', localField: "TienNghi", foreignField: "_id", as: `TienNghi` } },
              { $lookup: { from: 'loaichonghis', localField: "LoaiChoNghi", foreignField: "_id", as: `LoaiChoNghi` } },
              { $lookup: { from: 'phongs', localField: "Phong", foreignField: "_id", as: `Phong` } },
              { $lookup: { from: 'tindungs', localField: "TinDung", foreignField: "_id", as: `TinDung` } },
            ]);
            break;
          }

          default: {

            ChoNghis = await ChoNghiModel.aggregate([
              { $lookup: { from: 'phanhois', localField: "_id", foreignField: "MaKhachSan", as: `PhanHoi` } },
              { $addFields: { "DiemTB": { $divide: [{ "$sum": "$PhanHoi.Diem" }, { "$size": "$PhanHoi" }] } } },
              { $match: { $expr: { $eq: [{ $toString: `$${filter}` }, value] } } },
              { $lookup: { from: 'thanhphos', localField: "ThanhPho", foreignField: "_id", as: `ThanhPho` } },
              { $lookup: { from: 'tiennghis', localField: "TienNghi", foreignField: "_id", as: `TienNghi` } },
              { $lookup: { from: 'loaichonghis', localField: "LoaiChoNghi", foreignField: "_id", as: `LoaiChoNghi` } },
              { $lookup: { from: 'phongs', localField: "Phong", foreignField: "_id", as: `Phong` } },
              { $lookup: { from: 'tindungs', localField: "TinDung", foreignField: "_id", as: `TinDung` } },
            ]);
          }

        }

        return res.json({ message: "success", ChoNghis, type: `filterV2-${filterV2}` });
      }
      //groupBy = 'Thanh Pho' 'LoaiChoNghi
      if (groupBy) {
        ChoNghis = await ChoNghiModel.aggregate([
          { $group: { _id: `$${groupBy}`, TongSo: { $count: {} } } },
          {
            $lookup: {
              from: `${groupBy.toLowerCase()}s`,
              localField: "_id",
              foreignField: "_id",
              as: `${groupBy}`,
            },
          },
          {
            $project: {
              [groupBy]: {
                $cond: [
                  { $ne: [groupBy, "XepHang"] },
                  { $arrayElemAt: [`$${groupBy}`, 0] },
                  "$_id",
                ],
              },
              TongSo: "$TongSo",
            },
          },
        ]);
        return res.json({
          message: "success",
          ChoNghis,
          type: `groupBy-${groupBy}`,
        });
      }

      ChoNghis = await ChoNghiModel.aggregate([
        { $lookup: { from: "thanhphos", localField: "ThanhPho", foreignField: "_id", as: `ThanhPho` } },
        { $lookup: { from: "tiennghis", localField: "TienNghi", foreignField: "_id", as: `TienNghi` } },
        { $lookup: { from: "loaichonghis", localField: "LoaiChoNghi", foreignField: "_id", as: `LoaiChoNghi` } },
        { $lookup: { from: "phongs", localField: "Phong", foreignField: "_id", as: `Phong` } },
        { $lookup: { from: "tindungs", localField: "TinDung", foreignField: "_id", as: `TinDung` } },
        { $lookup: { from: "phanhois", localField: "_id", foreignField: "MaKhachSan", as: `PhanHoi` }, },
        { $addFields: { DiemTB: { $divide: [{ $sum: "$PhanHoi.Diem" }, { $size: "$PhanHoi" }] }, }, },
        {
          $match: search
            ? {
              $or: [
                { "ThanhPho.TenThanhPho": new RegExp(search, "i") },
                { "LoaiChoNghi.TenLoaiChoNghi": new RegExp(search, "i") },
                { TenChoNghi: new RegExp(search, "i") },
              ],
            }
            : {},
        },
      ]);

      console.log({ search })
      //total found
      const TongSo = ChoNghis.length;
      //pagination
      const start = _page ? (_page - 1) * _limit : 0;
      const end = start + (_limit ? +_limit : TongSo);
      ChoNghis = ChoNghis.slice(start, end);

      return res.json({ message: "success", ChoNghis, type: `normal-${filter}`, _page: +_page, _limit: +_limit, TongSo, _totalPage: _limit ? Math.ceil(TongSo / _limit) : 1 });

    } catch (error) {
      res.status(500).json({ message: "error" + error.message })
      console.log(error.message)
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

      res.json({
        message: "success",
        ChoNghis,
        _page: +_page,
        _limit: +_limit,
        _totalPage: Math.ceil(_totalPage / _limit) || _totalPage,
        TongSo: _totalPage,
        search,
      });
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
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
              model: "LoaiPhong",
            },
            {
              path: "ThongTinGiuong.Giuong",
              model: "LoaiGiuong",
            },
            {
              path: "TienNghi",
              model: "TienNghi",
            },
          ],
        })
        .exec();
      if (!ChoNghi)
        return res.status(400).json({ message: "Chổ nghỉ không tồn tại !" });
      res.json({ message: "success", ChoNghi });
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
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
        TinDung,
      } = req.body;

      //avatar
      const HinhAnh = ["link-anh1", "link-anh2", "link-anh3"];
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
        TinDung,
      });
      await newChoNghi.save();
      res.json({ message: "Thêm Chổ nghỉ thành công !" });
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
    }
  },
  patch: async (req, res) => {
    try {
      const { MaChoNghi } = req.params;

      const ChoNghi = await ChoNghiModel.updateOne(
        { _id: MaChoNghi },
        { ...req.body }
      );
      if (ChoNghi.matchedCount === 0)
        return res.status(400).json({ message: "Chổ nghỉ không tồn tại !" });

      res.json({ message: "Sửa Chổ nghỉ thành công !" });
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { MaChoNghi } = req.params;
      const ChoNghi = await ChoNghiModel.deleteOne({ _id: MaChoNghi });
      if (ChoNghi.deletedCount === 0)
        return res.status(400).json({ message: "Chổ nghỉ không tồn tại !" });

      res.json({ message: "Xóa Chổ nghỉ thành công !" });
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
    }
  },
};
