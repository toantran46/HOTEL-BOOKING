export const bookingMonthlyIncome = (bookings) => {
  let [
    january,
    february,
    march,
    april,
    may,
    june,
    july,
    august,
    september,
    october,
    november,
    december,
  ] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  bookings.forEach((booking) => {
    if (booking.DaThanhToan) {
      const date = new Date(booking.NgayNhanPhong);
      switch (date.getMonth()) {
        case 0:
          january += booking.TongTien;
          break;
        case 1:
          february += booking.TongTien;
          break;
        case 2:
          march += booking.TongTien;
          break;
        case 3:
          april += booking.TongTien;
          break;
        case 4:
          may += booking.TongTien;
          break;
        case 5:
          june += booking.TongTien;
          break;
        case 6:
          july += booking.TongTien;
          break;
        case 7:
          august += booking.TongTien;
          break;
        case 8:
          september += booking.TongTien;
          break;
        case 9:
          october += booking.TongTien;
          break;
        case 10:
          november += booking.TongTien;
          break;
        default:
          december += booking.TongTien;
          break;
      }
    }
  });
  return [
    january.toFixed(2),
    february.toFixed(2),
    march.toFixed(2),
    april.toFixed(2),
    may.toFixed(2),
    june.toFixed(2),
    july.toFixed(2),
    august.toFixed(2),
    september.toFixed(2),
    october.toFixed(2),
    november.toFixed(2),
    december.toFixed(2),
  ];
};
