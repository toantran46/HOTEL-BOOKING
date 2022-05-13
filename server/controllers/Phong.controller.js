const { default: mongoose } = require("mongoose");
const ChoNghiModel = require("../models/ChoNghi.model");
const DatPhongModel = require("../models/DatPhong.model");
const LoaiGiuongModel = require("../models/LoaiGiuong.model");
const PhongModel = require("../models/Phong.model");
const jwt = require("jsonwebtoken");

module.exports = {
  getAll: async (req, res) => {
    try {
      const { MaKhachSan, _page, _limit, action } = req.query;
      let Phongs;

      if (MaKhachSan) {
        let ChoNghi = await ChoNghiModel.findOne({ _id: MaKhachSan });
        Phongs = await PhongModel.find({ _id: { $in: ChoNghi.Phong } })
          .populate("LoaiPhong")
          .populate({
            path: "ThongTinGiuong",
            populate: {
              path: "Giuong",
              model: "LoaiGiuong",
            },
          })
          .populate("TienNghi")
          .exec();
      } else {

        let DSPhong = [];
        let roleOwner = false;
        if (action === 'admin') {
          try {
            const token = req.headers.authorization.split(" ")[1];
            let user = await jwt.verify(token, process.env.JWT_KEY);

            if (user.Quyen === 'MANAGER') {
              let ChoNghis = await ChoNghiModel.find({ QuanLy: mongoose.Types.ObjectId(user.userId) });
              ChoNghis.forEach(x => {
                DSPhong = [...DSPhong, ...x.Phong];
              });
              //get list room unique
              DSPhong = DSPhong.filter((x, index) => DSPhong.indexOf(x) === index);

              DSPhong = DSPhong.map(p => mongoose.Types.ObjectId(p._id));
              roleOwner = true;
            }
          } catch (error) {
            console.log(error);
            return res.status(400).json({ message: "Auth failed" })
          }
        }

        Phongs = await PhongModel.find(roleOwner ? { _id: { $in: DSPhong } } : {})
          .populate("LoaiPhong")
          .populate({
            path: "ThongTinGiuong",
            populate: {
              path: "Giuong",
              model: "LoaiGiuong",
            },
          })
          .populate("TienNghi")
          .exec();
      }

      //pagination
      const TongSo = Phongs.length;
      const start = _page ? (_page - 1) * _limit : 0;
      const end = start + (_limit ? +_limit : TongSo);
      Phongs = Phongs.slice(start, end);
      return res.json({ message: "success", Phongs, totalPage: Math.ceil(TongSo / _limit), _page: +_page, _limit: +_limit, total: TongSo });

    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
    }
  },
  getEmptyRoom: async (req, res) => {
    // get Id Cho Nghi
    const chonghi = req.params.chonghi;
    try {
      const { ngayNhanPhong, ngayTraPhong } = req.query;

      const ChoNghi = await ChoNghiModel.findById(chonghi);

      if (ngayNhanPhong === "undefined" || ngayTraPhong === "undefined") {
        const result = await ChoNghi.populate("Phong");

        result.Phong = await Promise.all(
          result.Phong.map(async (phong) => {
            return await PhongModel.findById(phong._id)
              .populate("LoaiPhong")
              .populate({
                path: "ThongTinGiuong",
                populate: {
                  path: "Giuong",
                  model: "LoaiGiuong",
                },
              })
              .populate("TienNghi")
              .exec();
          })
        );

        return res.json(result.Phong);
      }

      const danhSachDatPhong = await DatPhongModel.find({
        MaKhachSan: chonghi,
      });


      const danhSachDatPhongTheoNgay = danhSachDatPhong.filter((item) => {
        return !(
          (new Date(ngayNhanPhong) < new Date(item.NgayNhanPhong) &&
            new Date(ngayTraPhong) < new Date(item.NgayNhanPhong)) ||
          (new Date(ngayNhanPhong) > new Date(item.NgayTraPhong) &&
            new Date(ngayTraPhong) > new Date(item.NgayTraPhong))
        );
      });
      console.log({ danhSachDatPhongTheoNgay });

      if (danhSachDatPhongTheoNgay.length === 0) {
        const result = await ChoNghi.populate("Phong");
        result.Phong = await Promise.all(
          result.Phong.map(async (phong) => {
            return await PhongModel.findById(phong._id)
              .populate("LoaiPhong")
              .populate({
                path: "ThongTinGiuong",
                populate: {
                  path: "Giuong",
                  model: "LoaiGiuong",
                },
              })
              .populate("TienNghi")
              .exec();
          })
        );
        console.log({ phong: result.Phong });
        return res.json(result.Phong);
      } else {
        const thongtinphongs = danhSachDatPhongTheoNgay.map(
          (item) => item.ThongTinhPhong
        );
        let arr = [];
        thongtinphongs.forEach((item) => {
          arr = [...arr, ...item];
        });

        const phongIDS = arr.map((item) => item.Phong.valueOf());

        const Phongs = await PhongModel.find()
          .populate("LoaiPhong")
          .populate({
            path: "ThongTinGiuong",
            populate: {
              path: "Giuong",
              model: "LoaiGiuong",
            },
          })
          .populate("TienNghi")
          .exec();
        const emptyRoom = Phongs.filter((phong) => {
          return !phongIDS.includes(phong._id.valueOf());
        });
        res.json(emptyRoom);
      }
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
    }
  },
  get: async (req, res) => {
    try {
      const { MaPhong } = req.params;
      const Phong = await PhongModel.findOne({ _id: MaPhong })
        .populate("LoaiPhong")
        .populate({
          path: "ThongTinGiuong",
          populate: {
            path: "Giuong",
            model: "LoaiGiuong",
          },
        })
        .populate("TienNghi")
        .exec();
      if (!Phong)
        return res.status(400).json({ message: "Phòng không tồn tại !" });
      res.json({ message: "success", Phong });
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
    }
  },
  post: async (req, res) => {
    try {
      const {
        LoaiPhong,
        TenPhong,
        HutThuoc,
        ThongTinGiuong,
        SoLuongKhach,
        KichThuoc,
        Gia,
        TrangThai,
        TienNghi,
        SoLuongPhong,
      } = req.body;

      // return;
      console.log(req.body);
      // return;

      //test
      // const ThongTinGiuong = [{
      //     Giuong: '62334a87bcdb23e1860a32c2',
      //     SoLuong: 1
      // },
      // {
      //     Giuong: '6233f3dcb9d6ae8b9430951b',
      //     SoLuong: 2
      // }
      // ];

      const newPhong = new PhongModel({
        LoaiPhong,
        TenPhong,
        HutThuoc,
        ThongTinGiuong,
        SoLuongKhach,
        KichThuoc,
        Gia,
        TrangThai,
        TienNghi,
        SoLuongPhong,
      });
      await newPhong.save();
      res.json({ message: "Thêm Phòng thành công !", MaPhong: newPhong._id });
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
    }
  },
  patch: async (req, res) => {
    try {
      const { MaPhong } = req.params;
      const {
        LoaiPhong,
        TenPhong,
        HutThuoc,
        ThongTinGiuong,
        SoLuongKhach,
        KichThuoc,
        Gia,
        TienNghi,
        SoLuongPhong
      } = req.body;
      const Phong = await PhongModel.updateOne(
        { _id: MaPhong },
        {
          LoaiPhong,
          TenPhong,
          HutThuoc,
          ThongTinGiuong,
          SoLuongKhach,
          KichThuoc,
          Gia,
          TienNghi,
          SoLuongPhong
        }
      );
      if (Phong.matchedCount === 0)
        return res.status(400).json({ message: "Phòng không tồn tại !" });

      res.json({ message: "Sửa Phòng thành công !" });
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { MaPhong } = req.params;
      const Phong = await PhongModel.deleteOne({ _id: MaPhong });
      if (Phong.deletedCount === 0)
        return res.status(400).json({ message: "Phòng không tồn tại !" });

      res.json({ message: "Xóa Phòng thành công !" });
    } catch (error) {
      res.status(500).json({ message: "error" + error.message });
    }
  },
};
