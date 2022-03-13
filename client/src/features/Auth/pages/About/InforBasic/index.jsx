import React from 'react';
import PropTypes from 'prop-types';

import './InforBasic.scss';
import { Button, Col, Form, Input, Label } from 'reactstrap';

InforBasic.propTypes = {

};

function InforBasic(props) {
  return (
    <div className='infor-basic'>
      <div className="row">
        <div className="align-header">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <h1>
              Quý vị đang làm tốt lắm, hãy tiếp tục!
            </h1>
          </div>
        </div>
        <div className="align-header">
          <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <div className="page-description">
              Hãy bắt đầu bằng cách cho chúng tôi biết tên, địa chỉ cùng chi tiết liên hệ của chỗ nghỉ.
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-9 basic-form">
          <Form>
            <fieldset>
              <Col sm={7} className='form-group'>
                <Label className='label-big'>
                  Tên của chỗ nghỉ là gì?
                </Label >
                <Input
                  id='nameHotel'
                  name='nameHotel'
                  type='text'
                />
                <span>Tên này sẽ được hiển thị tới khách khi họ tìm kiếm chỗ nghỉ.</span>
              </Col>
              <Col sm={4} className='form-group'>
                <Label>
                  Xếp hạng sao
                </Label>
                <Input
                  id="selectStar"
                  name="selectStar"
                  type="select"
                >
                  <option value="0">không áp dụng</option>
                  <option value="1">1 ✯</option>
                  <option value="2">2 ✯✯</option>
                  <option value="3">3 ✯✯✯</option>
                  <option value="4">4 ✯✯✯✯</option>
                  <option value="5">5 ✯✯✯✯✯</option>
                </Input>
              </Col>
            </fieldset>

            <fieldset>
              <Label className='label-big'>
                Chi tiết liên hệ của chỗ nghỉ là gì?
              </Label>
              <Col md={7} className='form-group'>
                <Label>
                  Tên người liên hệ
                </Label>
                <Input
                  id='nameOwner'
                  name='nameOwner'
                  type='text'
                />
              </Col>
              <Label>
                Số điện thoại liên lạc (để chúng tôi có thể hỗ trợ đăng ký của Quý vị khi cần)
              </Label>
              <Col md={4} className='form-group'>
                <Input
                  id='phoneOwner'
                  name='phoneOwner'
                  type='text'
                />
              </Col>
              <Col md={5} className='form-group'>
                <Label className='form-group'>
                  Quý vị có sở hữu nhiều khách sạn khác nhau, hoặc là thành viên của một chuỗi hay công ty quản lý bất động sản nào không?
                </Label>
                <div className="radio-block">
                  <div className="radio-block__radio">
                    <Label>
                      <Input
                        id='otherHothelCheck'
                        name='otherHothelCheck'
                        type='radio'
                      />
                      <span>Có</span>
                    </Label>
                  </div>
                  <div className="radio-block__radio">
                    <Label>
                      <Input
                        id='otherHothelCheck'
                        name='otherHothelCheck'
                        type='radio'
                      />
                      <span>Không</span>
                    </Label>
                  </div>
                </div>
              </Col>
            </fieldset>

            <fieldset>
              <div className="row">
                <div className="col-sx-12 col-sm-6 col-md-6">
                  <Label className='label-big'>
                    Chỗ nghỉ tọa lạc ở đâu?
                  </Label>
                  <Col md={11} className='form-group'>
                    <Label>
                      Địa chỉ phố
                    </Label>
                    <Input
                      id='addrMain'
                      name='addrMain'
                      type='text'
                    />
                    <Label>
                      Dòng địa chỉ 2
                    </Label>
                    <Input
                      id='addrStreet'
                      name='addrStreet'
                      type='text'
                    />
                    <Label>
                      Thành phố
                    </Label>
                    <Input
                      id='addrCity'
                      name='addrCity'
                      type='text'
                    />
                  </Col>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6">
                  <div className="information-block">
                    <div className="col-xs-3">
                      <img src="https://q.bstatic.com/static/img/join/letter-verification-icon.png" />
                    </div>
                    <div className="col-xs-9">
                      <div className="label-big">
                        Địa chỉ của Quý vị quan trọng
                      </div>
                      <p>Vui lòng cung cấp đầy đủ thông tin về địa chỉ của chỗ nghỉ, bao gồm tên và số tòa nhà v.v. Dựa trên thông tin Quý vị cung cấp, có thể chúng tôi sẽ gửi thư qua đường bưu điện để xác minh địa chỉ.</p>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            <Button color='primary' type='submit'>
              Tiếp tục
            </Button>
          </Form>
        </div>
        <div className="col-md-3 sticky-col">
          <p>
            Sau khi hoàn tất đăng ký, Quý vị vẫn sẽ có thể thực hiện thay đổi cho đăng ký trước khi chỗ nghỉ online.
          </p>
        </div>
      </div>
    </div>
  );
}

export default InforBasic;