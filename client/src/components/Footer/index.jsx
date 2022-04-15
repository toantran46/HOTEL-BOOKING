import React from "react";
import PropTypes from "prop-types";

import "./Footer.scss";
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";

Footer.propTypes = {};

function Footer(props) {
  return (
    <div className="footer">
      <div className="footer__post">
        <Link to="/auth">Đăng chổ nghĩ của quý vị </Link>
      </div>
      <div className="footer__container">
        <div className="footer__container__top">
          <ul>
            <li>
              <a href="#">Phiên bản di dộng</a>
            </li>
            <li>
              <a href="#">Tài khoản của bạn</a>
            </li>
            <li>
              <a href="#">Thay đổi đặt phòng của bạn trực tuyến</a>
            </li>
            <li>
              <a href="#">Liên hệ Dịch vụ Khách hàng</a>
            </li>
            <li>
              <a href="#">Trở thành đối tác phân phối</a>
            </li>
            <li>
              <a href="#">Booking.com dành cho doanh nghiệp</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom-container">
        <div className="footer__bottom-container__main">
          <Row>
            <Col>
              <ul>
                <li>
                  <a href="#">Các quốc gia</a>
                </li>
                <li>
                  <a href="#">Khu vực</a>
                </li>
                <li>
                  <a href="#">Thành phố</a>
                </li>
                <li>
                  <a href="#">Quận</a>
                </li>
                <li>
                  <a href="#">Sân bay</a>
                </li>
                <li>
                  <a href="#">Khách sạn</a>
                </li>
                <li>
                  <a href="#">Địa điểm được quan tâm</a>
                </li>
              </ul>
            </Col>
            <Col>
              <ul>
                <li>
                  <a href="#">Nhà </a>
                </li>
                <li>
                  <a href="#">Căn hộ</a>
                </li>
                <li>
                  <a href="#">Resort</a>
                </li>
                <li>
                  <a href="#">Biệt thự</a>
                </li>
                <li>
                  <a href="#">Nhà trọ</a>
                </li>
                <li>
                  <a href="#">Nhà nghỉ B&B</a>
                </li>
                <li>
                  <a href="#">Nhà khách</a>
                </li>
              </ul>
            </Col>
            <Col>
              <ul>
                <li>
                  <a href="#">Những chổ nghỉ độc đáo </a>
                </li>
                <li>
                  <a href="#">Tất cả điểm đến</a>
                </li>
                <li>
                  <a href="#">Khám phá</a>
                </li>
                <li>
                  <a href="#">Đánh giá của khách</a>
                </li>
                <li>
                  <a href="#">Các bài viết</a>
                </li>
                <li>
                  <a href="#">Ưu đãi theo mùa và dịp lễ</a>
                </li>
              </ul>
            </Col>
            <Col>
              <ul>
                <li>
                  <a href="#">Cho thuê xe hơi</a>
                </li>
                <li>
                  <a href="#">Tìm chuyến bay</a>
                </li>
                <li>
                  <a href="#">Đặt nhà hàng</a>
                </li>
                <li>
                  <a href="#">LTBooking.vn dành cho đại lý du lịch</a>
                </li>
              </ul>
            </Col>
            <Col>
              <ul>
                <li>
                  <a href="#">về LTBooking.vn</a>
                </li>
                <li>
                  <a href="#">Liên hệ dịch vụ khách hàng</a>
                </li>
                <li>
                  <a href="#">Trợ giúp đối tác</a>
                </li>
                <li>
                  <a href="#">Du lịch bền vững</a>
                </li>
                <li>
                  <a href="#">Truyền thông</a>
                </li>
                <li>
                  <a href="#">Quan hệ cổ đông</a>
                </li>
                <li>
                  <a href="#">Tranh chấp đối tác</a>
                </li>
                <li>
                  <a href="#">Liên hệ công ty</a>
                </li>
              </ul>
            </Col>
          </Row>
          <div className="footer__bottom-container__main__btn-manage">
            <Link to="#">Đăng nhập vào trang Extranet</Link>
          </div>
          <div className="footer__bottom-container__main__policy">
            Bản quyền &copyright 1996-2022 LTBooking.vn . Bảo lưu mọi quyền
          </div>
          <p className="footer__bottom-container__main__about">
            LTBooking.vn là một phần của Booking Holding Inc., tập đoàn đứng đầu
            thế giới về du lịch trực tuyến và các dịch vụ liên quan
          </p>
          <div className="footer__bottom-container__main__logos">
            <div className="footer__bottom-container__main__logos__logo">
              <img
                src="https://t-cf.bstatic.com/static/img/tfl/group_logos/logo_booking/27c8d1832de6a3123b6ee45b59ae2f81b0d9d0d0.png"
                alt="logo"
              />
            </div>
            <div className="footer__bottom-container__main__logos__logo">
              <img
                src="https://t-cf.bstatic.com/static/img/tfl/group_logos/logo_priceline/f80e129541f2a952d470df2447373390f3dd4e44.png"
                alt="logo"
              />
            </div>
            <div className="footer__bottom-container__main__logos__logo">
              <img
                src="https://t-cf.bstatic.com/static/img/tfl/group_logos/logo_kayak/83ef7122074473a6566094e957ff834badb58ce6.png"
                alt="logo"
              />
            </div>
            <div className="footer__bottom-container__main__logos__logo">
              <img
                src="https://t-cf.bstatic.com/static/img/tfl/group_logos/logo_agoda/1c9191b6a3651bf030e41e99a153b64f449845ed.png"
                alt="logo"
              />
            </div>
            <div className="footer__bottom-container__main__logos__logo">
              <img
                src="https://t-cf.bstatic.com/static/img/tfl/group_logos/logo_rentalcars/6bc5ec89d870111592a378bbe7a2086f0b01abc4.png"
                alt="logo"
              />
            </div>
            <div className="footer__bottom-container__main__logos__logo">
              <img
                src="https://t-cf.bstatic.com/static/img/tfl/group_logos/logo_opentable/a4b50503eda6c15773d6e61c238230eb42fb050d.png"
                alt="logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
