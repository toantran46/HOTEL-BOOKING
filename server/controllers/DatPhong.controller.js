const DatPhongModel = require("../models/DatPhong.model");
const ChoNghiModel = require("../models/ChoNghi.model");
const { sendMail } = require("../sevices/mail");
const { getInfoUser } = require("../middleware/checkAuthReturnResult");
const { default: mongoose } = require("mongoose");

module.exports = {
    getAll: async (req, res) => {
        try {
            let DatPhongs;
            const user = req.user;
            const { _limit, _page, action } = req.query;
            //verify account. Can't use middleware checkAuth; 
            //role USER 

            if (action === 'admin') {
                let DSChoNghi;
                try {
                    if (req.user.Quyen === 'MANAGER') {
                        let ChoNghi = await ChoNghiModel.find({ QuanLy: mongoose.Types.ObjectId(req.user.userId) });
                        DSChoNghi = ChoNghi.map(x => mongoose.Types.ObjectId(x._id));
                    }
                } catch (error) {
                    console.log(error);
                    return res.status(400).json({ message: "Auth failed" })
                }


                DatPhongs = await DatPhongModel.find(DSChoNghi ? { MaKhachSan: { $in: DSChoNghi } } : {});
            } else {
                DatPhongs = await DatPhongModel.find({ MaNguoiDung: user.userId }).populate({
                    path: "MaKhachSan",
                    populate: [
                        {
                            path: "ThanhPho",
                            model: "ThanhPho",
                        },
                        {
                            path: "LoaiChoNghi",
                            model: "LoaiChoNghi",
                        },
                        {
                            path: "QuanLy",
                            select: "name phone",
                            model: "NguoiDung",
                        },
                    ],
                }).populate("ThongTinhPhong.Phong").populate("MaNguoiDung", "name phone email").exec();
            }

            //pagination
            const TongSo = DatPhongs.length;
            //pagination
            const start = _page ? (_page - 1) * _limit : 0;
            const end = start + (_limit ? +_limit : TongSo);
            DatPhongs = DatPhongs.slice(start, end);
            return res.json({ message: "success", DatPhongs, totalPage: Math.ceil(TongSo / _limit), _page: +_page, _limit: +_limit, total: TongSo });
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    get: async (req, res) => {
        try {
            const { MaDatPhong } = req.params;
            const DatPhong = await DatPhongModel.findOne({ _id: MaDatPhong });
            if (!DatPhong) return res.status(400).json({ message: "Đặt phòng không tồn tại !" });
            res.json({ message: "success", DatPhong })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    post: async (req, res) => {
        try {
            const {
                ThongTinPhong,
                HoTenNguoiDat,
                Email,
                YeuCau,
                MaKhachSan,
                NgayNhanPhong,
                NgayTraPhong,
                TongTien,
                SoDienThoai,
                TinDung,
                ThoiGianDenDuKien,
            } = req.body;

            //check is Auth or not Auth
            const MaNguoiDung = getInfoUser(req)?.userId;
            const newDatPhong = new DatPhongModel({
                ThongTinhPhong: ThongTinPhong,
                HoTenNguoiDat,
                MaNguoiDung,
                Email,
                YeuCau,
                MaKhachSan,
                NgayNhanPhong,
                NgayTraPhong,
                TongTien,
                SoDienThoai,
                TinDung,
                ThoiGianDenDuKien
            })
            await newDatPhong.save();

            //data for send mail
            const DatPhong = await DatPhongModel.findById(newDatPhong._id).populate("ThongTinhPhong.Phong").populate({
                path: "MaKhachSan",
                populate: [
                    {
                        path: "ThanhPho",
                        model: "ThanhPho",
                    },
                    {
                        path: "QuanLy",
                        model: "NguoiDung",
                        select: "_id name email"
                    },
                ],
            })
            const fitDataRoom = DatPhong.ThongTinhPhong.map((TTP) => ({ name: TTP.Phong.TenPhong, quantity: TTP.SoLuong }));

            const infoBooking = {
                name: DatPhong.HoTenNguoiDat,
                email: DatPhong.Email,
                phone: DatPhong.SoDienThoai,
                userType: MaNguoiDung ? "Thành viên" : "Khách vãng lai",
                placeName: DatPhong.MaKhachSan.TenChoNghi,
                placeAddress: DatPhong.MaKhachSan.DiaChi + ", " + DatPhong.MaKhachSan.ThanhPho.TenThanhPho,
                room: fitDataRoom,
                receiveDate: NgayNhanPhong,
                returnDate: NgayTraPhong,
                intentTime: DatPhong.ThoiGianDenDuKien === "Không biết" ? `${DatPhong.MaKhachSan.ThoiGianNhanPhong.Tu}:00 - ${DatPhong.MaKhachSan.ThoiGianNhanPhong.Den}:00` : DatPhong.ThoiGianDenDuKien,
                totalPrice: DatPhong.TongTien,
                status: DatPhong.TrangThai,
            }
            const sendForUser = await sendMail(DatPhong.Email, "booked-to-user", infoBooking);
            const sendForOwner = await sendMail(DatPhong.MaKhachSan.QuanLy.email, "booked-to-owner", infoBooking);
            console.log({ sendForOwner, sendForUser })
            res.json({ message: "Đặt phòng thành công !. Quý khách có thể check mail để xem lại thông tin. Xin cảm ơn !." })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
            console.log(error.message);
        }
    },
    patch: async (req, res) => {
        try {
            const { MaDatPhong } = req.params;

            const DatPhong = await DatPhongModel.updateOne({ _id: MaDatPhong }, { ...req.body });
            if (DatPhong.matchedCount === 0) return res.status(400).json({ message: "Đặt phòng không tồn tại !" });

            res.json({ message: "Sửa đặt phòng thành công !" });
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
    delete: async (req, res) => {
        try {
            const { MaDatPhong } = req.params;
            const DatPhong = await DatPhongModel.deleteOne({ _id: MaDatPhong });
            if (DatPhong.deletedCount === 0) return res.status(400).json({ message: "Đặt phòng không tồn tại !" });

            res.json({ message: "Xóa đặt phòng thành công !" })
        } catch (error) {
            res.status(500).json({ message: "error" + error.message })
        }
    },
}