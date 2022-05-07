const { default: mongoose } = require("mongoose");
const { getInfoUser } = require("../middleware/checkAuthReturnResult");
const ChoNghiModel = require("../models/ChoNghi.model");
const cloudinary = require("../utils/cloudinary.config");
const jwt = require("jsonwebtoken");

function getMin(arr) {
  return arr.sort((a, b) => a - b)[0];
}

function findTienNghi(TienNghiFilter, TienNghiChoNghi) {
  return TienNghiChoNghi.find((item) =>
    TienNghiFilter.includes(item._id.toString())
  )
    ? true
    : false;
}

module.exports = {
  getAll: async (req, res) => {
    try {
      let ChoNghis;
      // Group by city : data for home page
      let { groupBy, _limit, _page, search, filter, filterV2, value, _idCity, action } =
        req.query;

      let role;

      if (action === 'admin') {
        try {
          const token = req.headers.authorization.split(" ")[1];
          let user = await jwt.verify(token, process.env.JWT_KEY);
          if (user.Quyen === 'MANAGER') role = { "QuanLy._id": mongoose.Types.ObjectId(user.userId) };
          if (user.Quyen === 'ADMIN') role = {};
        } catch (error) {
          console.log(error);
          return res.status(400).json({ message: "Auth failed" })
        }

      }

      // filter : LoaiChoNghi , XepHang ,DiemDanhGia, TienNghi
      if (filter) {
        filter = JSON.parse(filter);
        ChoNghis = await ChoNghiModel.aggregate([
          {
            $match: _idCity
              ? { ThanhPho: mongoose.Types.ObjectId(_idCity) }
              : {},
          },
          {
            $lookup: {
              from: "phanhois",
              localField: "_id",
              foreignField: "MaKhachSan",
              as: `PhanHoi`,
            },
          },
          {
            $addFields: {
              DiemTB: {
                $divide: [{ $sum: "$PhanHoi.Diem" }, { $cond: { if: { $eq: [{ $size: "$PhanHoi" }, 0] }, then: 1, else: { $size: "$PhanHoi" } } }],
              },
            },
          },
          {
            $lookup: {
              from: "thanhphos",
              localField: "ThanhPho",
              foreignField: "_id",
              as: `ThanhPho`,
            },
          },
          {
            $lookup: {
              from: "tiennghis",
              localField: "TienNghi",
              foreignField: "_id",
              as: `TienNghi`,
            },
          },
          {
            $lookup: {
              from: "loaichonghis",
              localField: "LoaiChoNghi",
              foreignField: "_id",
              as: `LoaiChoNghi`,
            },
          },
          {
            $lookup: {
              from: "phongs",
              localField: "Phong",
              foreignField: "_id",
              as: `Phong`,
            },
          },
          {
            $lookup: {
              from: "tindungs",
              localField: "TinDung",
              foreignField: "_id",
              as: `TinDung`,
            },
          },
        ]);

        ChoNghis = ChoNghis.filter((ChoNghi) =>
          filter.LoaiChoNghi.length > 0
            ? filter.LoaiChoNghi.includes(ChoNghi.LoaiChoNghi[0]._id.toString())
            : true
        )
          .filter((ChoNghi) =>
            filter.XepHang.length > 0
              ? filter.XepHang.includes(ChoNghi.XepHang)
              : true
          )
          .filter((ChoNghi) =>
            filter.DiemDanhGia.length > 0
              ? ChoNghi.DiemTB >= getMin(filter.DiemDanhGia)
              : true
          )
          .filter((ChoNghi) =>
            filter.TienNghi.length > 0
              ? findTienNghi(filter.TienNghi, ChoNghi.TienNghi)
              : true
          );

        //total found
        const TongSo = ChoNghis.length;
        //pagination
        const start = _page ? (_page - 1) * _limit : 0;
        const end = start + (_limit ? +_limit : TongSo);
        ChoNghis = ChoNghis.slice(start, end);

        return res.json({
          message: "success",
          ChoNghis,
          type: `filter-${filter}`,
          _page: +_page,
          _limit: +_limit,
          TongSo,
          _totalPage: _limit ? Math.ceil(TongSo / _limit) : 1,
        });
      }

      if (filterV2) {
        switch (filterV2) {
          case "DiemDanhGia": {
            ChoNghis = await ChoNghiModel.aggregate([
              {
                $lookup: {
                  from: "phanhois",
                  localField: "_id",
                  foreignField: "MaKhachSan",
                  as: `PhanHoi`,
                },
              },
              {
                $addFields: {
                  DiemTB: {
                    $divide: [{ $sum: "$PhanHoi.Diem" }, { $cond: { if: { $eq: [{ $size: "$PhanHoi" }, 0] }, then: 1, else: { $size: "$PhanHoi" } } }],
                  },
                },
              },
              { $match: { DiemTB: { $gte: value * 1 } } },
              {
                $lookup: {
                  from: "thanhphos",
                  localField: "ThanhPho",
                  foreignField: "_id",
                  as: `ThanhPho`,
                },
              },
              {
                $lookup: {
                  from: "tiennghis",
                  localField: "TienNghi",
                  foreignField: "_id",
                  as: `TienNghi`,
                },
              },
              {
                $lookup: {
                  from: "loaichonghis",
                  localField: "LoaiChoNghi",
                  foreignField: "_id",
                  as: `LoaiChoNghi`,
                },
              },
              {
                $lookup: {
                  from: "phongs",
                  localField: "Phong",
                  foreignField: "_id",
                  as: `Phong`,
                },
              },
              {
                $lookup: {
                  from: "tindungs",
                  localField: "TinDung",
                  foreignField: "_id",
                  as: `TinDung`,
                },
              },
            ]);
            break;
          }
          case "TienNghi": {
            ChoNghis = await ChoNghiModel.aggregate([
              {
                $lookup: {
                  from: "phanhois",
                  localField: "_id",
                  foreignField: "MaKhachSan",
                  as: `PhanHoi`,
                },
              },
              {
                $addFields: {
                  DiemTB: {
                    $divide: [{ $sum: "$PhanHoi.Diem" }, { $cond: { if: { $eq: [{ $size: "$PhanHoi" }, 0] }, then: 1, else: { $size: "$PhanHoi" } } }],
                  },
                },
              },
              {
                $match: {
                  $expr: { $in: [{ $toObjectId: value }, "$TienNghi"] },
                },
              },
              {
                $lookup: {
                  from: "thanhphos",
                  localField: "ThanhPho",
                  foreignField: "_id",
                  as: `ThanhPho`,
                },
              },
              {
                $lookup: {
                  from: "tiennghis",
                  localField: "TienNghi",
                  foreignField: "_id",
                  as: `TienNghi`,
                },
              },
              {
                $lookup: {
                  from: "loaichonghis",
                  localField: "LoaiChoNghi",
                  foreignField: "_id",
                  as: `LoaiChoNghi`,
                },
              },
              {
                $lookup: {
                  from: "phongs",
                  localField: "Phong",
                  foreignField: "_id",
                  as: `Phong`,
                },
              },
              {
                $lookup: {
                  from: "tindungs",
                  localField: "TinDung",
                  foreignField: "_id",
                  as: `TinDung`,
                },
              },
            ]);
            break;
          }

          default: {
            ChoNghis = await ChoNghiModel.aggregate([
              {
                $lookup: {
                  from: "phanhois",
                  localField: "_id",
                  foreignField: "MaKhachSan",
                  as: `PhanHoi`,
                },
              },
              {
                $addFields: {
                  DiemTB: {
                    $divide: [{ $sum: "$PhanHoi.Diem" }, { $cond: { if: { $eq: [{ $size: "$PhanHoi" }, 0] }, then: 1, else: { $size: "$PhanHoi" } } }],

                  },
                },
              },
              {
                $match: {
                  $expr: { $eq: [{ $toString: `$${filter}` }, value] },
                },
              },
              {
                $lookup: {
                  from: "thanhphos",
                  localField: "ThanhPho",
                  foreignField: "_id",
                  as: `ThanhPho`,
                },
              },
              {
                $lookup: {
                  from: "tiennghis",
                  localField: "TienNghi",
                  foreignField: "_id",
                  as: `TienNghi`,
                },
              },
              {
                $lookup: {
                  from: "loaichonghis",
                  localField: "LoaiChoNghi",
                  foreignField: "_id",
                  as: `LoaiChoNghi`,
                },
              },
              {
                $lookup: {
                  from: "phongs",
                  localField: "Phong",
                  foreignField: "_id",
                  as: `Phong`,
                },
              },
              {
                $lookup: {
                  from: "tindungs",
                  localField: "TinDung",
                  foreignField: "_id",
                  as: `TinDung`,
                },
              },
            ]);
          }
        }

        return res.json({
          message: "success",
          ChoNghis,
          type: `filterV2-${filterV2}`,
        });
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

      //normal
      ChoNghis = await ChoNghiModel.aggregate([
        {
          $lookup: {
            from: "thanhphos",
            localField: "ThanhPho",
            foreignField: "_id",
            as: `ThanhPho`,
          },
        },
        {
          $lookup: {
            from: "tiennghis",
            localField: "TienNghi",
            foreignField: "_id",
            as: `TienNghi`,
          },
        },
        {
          $lookup: {
            from: "loaichonghis",
            localField: "LoaiChoNghi",
            foreignField: "_id",
            as: `LoaiChoNghi`,
          },
        },
        {
          $lookup: {
            from: "phongs",
            localField: "Phong",
            foreignField: "_id",
            as: `Phong`,
          },
        },
        {
          $lookup: {
            from: "tindungs",
            localField: "TinDung",
            foreignField: "_id",
            as: `TinDung`,
          },
        },
        {
          $lookup: {
            from: "nguoidungs",
            localField: "QuanLy",
            foreignField: "_id",
            as: `QuanLy`,
          },
        },
        {
          $lookup: {
            from: "phanhois",
            localField: "_id",
            foreignField: "MaKhachSan",
            as: `PhanHoi`,
          },
        },
        {
          $addFields: {
            DiemTB: {
              $divide: [{ $sum: "$PhanHoi.Diem" }, { $cond: { if: { $eq: [{ $size: "$PhanHoi" }, 0] }, then: 1, else: { $size: "$PhanHoi" } } }],
            },
          },
        },
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
        {
          $match: !!role
            ? { ...role } : {},
        },
      ]);

      //total found
      const TongSo = ChoNghis.length;
      //pagination
      const start = _page ? (_page - 1) * _limit : 0;
      const end = start + (_limit ? +_limit : TongSo);
      ChoNghis = ChoNghis.slice(start, end);

      return res.json({
        message: "success",
        ChoNghis,
        type: `normal-${filter}`,
        _page: +_page,
        _limit: +_limit,
        TongSo,
        _totalPage: _limit ? Math.ceil(TongSo / _limit) : 1,
      });
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
      console.log(error.message);
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
      //avatar
      // req.body.HinhAnh = [];

      // if (req.files) {
      //   req.body.HinhAnh = await Promise.all(
      //     req.files.map((file) =>
      //       cloudinary.upload(file.path, process.env.CLOUD_FOLDER_UPLOAD)
      //     )
      //   );
      // }
      let QuanLy = req.user.userId;
      let {
        TenChoNghi,
        TieuDeDatDiem,
        MoTaDatDiem,
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
      // console.log(req.body);
      // // console.log(req.doTinDung);
      // return;

      const HinhAnh = req.files.map((image) => image.path);
      // res.status(200).json({ images: req.files });
      const TGNhanPhong = JSON.parse(ThoiGianNhanPhong);
      const TGTraPhong = JSON.parse(ThoiGianTraPhong);
      TinDung = JSON.parse(TinDung);
      const newChoNghi = new ChoNghiModel({
        TenChoNghi,
        QuanLy,
        TieuDeDatDiem,
        MoTaDatDiem,
        DiaChi,
        ThanhPho,
        XepHang,
        TienNghi: TienNghi.split(',').map((data) => mongoose.Types.ObjectId(data)),
        HinhAnh,
        Phong,
        HuyDatPhong,
        BaoHiemNhamLan,
        ThoiGianNhanPhong: {
          Tu: +TGNhanPhong.from,
          Den: +TGNhanPhong.to,
        },
        ThoiGianTraPhong: {
          Tu: +TGTraPhong.from,
          Den: +TGTraPhong.to,
        },
        TinDung,
      });
      // console.log(newChoNghi.TinDung);
      // return;
      await newChoNghi.save();
      res.json({ message: "Thêm Chổ nghỉ thành công !" });
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
    }
  },
  patch: async (req, res) => {
    try {
      const { MaChoNghi } = req.params;
      let {
        TenChoNghi,
        TieuDeDatDiem,
        MoTaDatDiem,
        DiaChi,
        ThanhPho,
        LoaiChoNghi,
        XepHang,
        TienNghi,
        HinhAnhURL,
        HuyDatPhong,
        BaoHiemNhamLan,
        ThoiGianNhanPhong,
        ThoiGianTraPhong,
        TinDung,
        HinhAnhDaXoa
      } = req.body;

      let HinhAnh = HinhAnhURL;
      //remove all via HinhAnhDaXoa
      //check if have file => join to old image url
      if (req.files) {
        const newURL = req.files.map(file => file.path);
        HinhAnh = JSON.parse(HinhAnh);
        HinhAnh = [...HinhAnh, ...newURL];

        //parse data
        TienNghi = JSON.parse(TienNghi);
        ThoiGianNhanPhong = JSON.parse(ThoiGianNhanPhong);
        ThoiGianTraPhong = JSON.parse(ThoiGianTraPhong);
        TinDung = JSON.parse(TinDung);
        HinhAnhDaXoa = JSON.parse(HinhAnhDaXoa);
      }

      //field OK
      let fieldsUpdate = {
        TenChoNghi,
        TieuDeDatDiem,
        MoTaDatDiem,
        DiaChi,
        ThanhPho,
        LoaiChoNghi,
        XepHang,
        TienNghi,
        HinhAnh,
        HuyDatPhong,
        BaoHiemNhamLan,
        ThoiGianNhanPhong,
        ThoiGianTraPhong,
        TinDung
      }
      const ChoNghi = await ChoNghiModel.updateOne(
        { _id: MaChoNghi },
        { ...fieldsUpdate }
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
