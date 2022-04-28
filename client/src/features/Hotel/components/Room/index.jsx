import React from "react";
import PropTypes from "prop-types";

import "./Room.scss";
import FavouriteConvenients from "../FavouriteConvenients";
import { ICONS } from "constants";
import { Select } from "antd";
import { convertToMoney } from "assets/globaJS";
Room.propTypes = {
  roomInfo: PropTypes.object,
  numDay: PropTypes.number,
  onChooseRoom: PropTypes.func,
};
Room.defaultProps = {
  roomInfo: {},
  numDay: 1,
  onChooseRoom: null,
};

function Room(props) {
  const { roomInfo, numDay, onChooseRoom } = props;


  return (
    <>
      <tr className="room">
        <td>
          <div className="room__name">{roomInfo?.TenPhong}</div>
          {roomInfo?.ThongTinGiuong?.map((giuong) => (
            <div key={giuong.Giuong?._id} className="room__bed">
              {giuong.SoLuong} {giuong.Giuong?.TenLoaiGiuong}
            </div>
          ))}
          {/* <div className='room__about'>Với tầm nhìn ra thành phố hoặc biển, phòng giường đôi này có khu vực tiếp khách với TV thông minh màn hình phẳng 40 inch và tiện nghi pha trà/cà phê. Phòng tắm riêng đi kèm vòi sen. Đồ vệ sinh cá nhân hiệu C.O. Bigelow được cung cấp cho khách.</div> */}
          <FavouriteConvenients convenients={roomInfo?.TienNghi} sameColor />
        </td>
        <td>
          {new Array(roomInfo?.SoLuongKhach).fill(Math.random()).map((element, index) => (
            <span key={element + index}>{ICONS.PERSON} </span>
          ))}
        </td>
        <td>
          <div className="room__price">VND {convertToMoney(numDay * roomInfo?.Gia)}</div>
          <div className="room__info">Đã bao gồm thuế và phí</div>
        </td>
        <td>
          <div className="room__freeTittle">
            <i class="bi bi-check-lg"></i>
            <div>Miễn phí hủy</div>
          </div>
          <div className="room__freeTittle">
            <i class="bi bi-check-lg"></i>
            <div>
              KHÔNG CẦN THANH TOÁN TRƯỚC –
              <em className="small">thanh toán tại chỗ nghỉ</em>{" "}
            </div>
          </div>
        </td>
        <td>
          <Select onChange={(value) => onChooseRoom(JSON.parse(value))} defaultValue={0} style={{ minWidth: "200px" }}>

            <Select.Option key={0} value={JSON.stringify({
              room: { _id: roomInfo?._id },
              quantity: 0,
            })}>0</Select.Option>
            {new Array(roomInfo.SoLuongPhong).fill().map((item, index) => (
              <Select.Option
                key={index + 1}
                value={JSON.stringify({
                  room: { _id: roomInfo?._id, name: roomInfo?.TenPhong, convenients: roomInfo?.TienNghi, customerMax: roomInfo.SoLuongKhach },
                  quantity: index + 1,
                  price: numDay * roomInfo.Gia * (index + 1),
                })}
              >
                {index + 1} (VND&nbsp;
                {convertToMoney(numDay * roomInfo.Gia * (index + 1))})
              </Select.Option>
            ))}
          </Select>
        </td>
      </tr>
      {/* <tr className='room'>
                <td>
                    {ICONS.PERSON}
                </td>
                <td>
                    <div className='room__price'>VND 54.014.300</div>
                    <div className='room__info'>Đã bao gồm thuế và phí</div>

                </td>
                <td>
                    <div className='room__freeTittle'>
                        <i class="bi bi-check-lg"></i>
                        <div>Miễn phí hủy</div>
                    </div>
                    <div className='room__freeTittle'>
                        <i class="bi bi-check-lg"></i>
                        <div>KHÔNG CẦN THANH TOÁN TRƯỚC –<em className='small'>thanh toán tại chỗ nghỉ</em> </div>
                    </div>
                </td>
                <td>
                    <Select style={{ minWidth: "200px" }}>
                        <Select.Option value={1}>
                            1 (VND&nbsp;64.014.300)
                        </Select.Option>
                        <Select.Option value={2}>
                            2
                            (VND&nbsp;64.014.300)
                        </Select.Option>
                    </Select>
                </td>
            </tr> */}
    </>
  );
}

export default Room;
