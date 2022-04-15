import React from 'react';
import PropTypes from 'prop-types';

import './InforBasic.scss';
import { Col, Label } from 'reactstrap';
import { Button, Input, Form, Select, Radio } from 'antd';
import { useForm } from 'react-hook-form';
import { thanhPhoApi } from 'api/ThanhPhoApi';

import { useDispatch, useSelector } from 'react-redux';
import { addInforBasic, setTab } from 'features/Auth/authSlice';

InforBasic.propTypes = {
  onSubmit: PropTypes.func,
};

InforBasic.defaultProps = {
  onSubmit: null,
}


function InforBasic(props) {

  const [form] = Form.useForm();

  const inforBasic = useSelector(state => state.aboutInfo);
  React.useEffect(() => {
    form.setFieldsValue(inforBasic);
  }, [inforBasic]);

  console.log(inforBasic);

  const dispatch = useDispatch();
  const handleSubmit = (values) => {

    // console.log(values);
    const action = addInforBasic(values);
    console.log({ action });

    dispatch(action);
    dispatch(setTab({
      key: 'next',
      tab: 1,
    }));
  }

  const defaultValues = {
    selectStar: 0,
    nameHotel: '',
    nameOwner: '',
    phoneOwner: '',
    otherHothelCheck: false,
    addrMain: '',
    addrCity: '',
  }

  const [listCity, setListCity] = React.useState([]);

  React.useEffect(() => {
    // console.log("1");
    const fetchCity = async () => {
      try {
        const { ThanhPhos } = await thanhPhoApi.getAll();
        setListCity(ThanhPhos);
        // console.log(ThanhPhos);
      }
      catch (error) {
        console.log(error)
      }

    }
    setTimeout(() => {
      fetchCity();
    }, 1000);
  }, [])

  return (
    <div className='infor-basic'>
      <div className="row">
        <div className="col-md-9 basic-form">
          <Form form={form} initialValues={defaultValues} onFinish={handleSubmit}
          >
            <fieldset>
              <Col sm={7} className='form-group'>
                <Label className='label-big'>
                  Tên của chỗ nghỉ là gì?
                </Label >
                <Form.Item

                  name='nameHotel'
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên chỗ nghỉ",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <span>Tên này sẽ được hiển thị tới khách khi họ tìm kiếm chỗ nghỉ.</span>
              </Col>
              <Col sm={4} className='form-group'>
                <Label>
                  Xếp hạng sao
                </Label>
                <Form.Item name="selectStar">
                  <Select
                    options={[
                      { label: "không áp dụng", value: 0 },
                      { label: "1 ✯", value: 1 },
                      { label: "2 ✯✯", value: 2 },
                      { label: "3 ✯✯✯", value: 3 },
                      { label: "4 ✯✯✯✯", value: 4 },
                      { label: "5 ✯✯✯✯", value: 5 },
                    ]}
                  />
                </Form.Item>
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
                <Form.Item
                  name='nameOwner'
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên người liên hệ",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Label>
                Số điện thoại liên lạc (để chúng tôi có thể hỗ trợ đăng ký của Quý vị khi cần)
              </Label>
              <Col md={4} className='form-group'>
                <Form.Item
                  name='phoneOwner'
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại"
                    },
                    {
                      min: 10,
                      max: 10,
                      message: "Vui lòng nhập đúng số điện thoại",
                    },
                    {
                      value: [0 - 9],
                      message: "Vui lòng chỉ nhập số",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col md={5} className='form-group'>
                <Label className='form-group'>
                  Quý vị có sở hữu nhiều khách sạn khác nhau, hoặc là thành viên của một chuỗi hay công ty quản lý bất động sản nào không?
                </Label>
                <div className="radio-block">
                  <Form.Item name="otherHothelCheck">
                    <Radio.Group>
                      <Radio value={true}>Có</Radio>
                      <Radio value={false}>Không</Radio>
                    </Radio.Group>
                  </Form.Item>
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
                    <Form.Item
                      name='addrMain'
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập địa chỉ phố",
                        },
                      ]}
                    >
                      <Input placeholder='246/8 Tầm Vu, phường Hưng Lợi, quận Ninh Kiều' />
                    </Form.Item>
                    <Label>
                      Thành phố
                    </Label>
                    <Form.Item
                      name='addrCity'
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập thành phố",
                        },
                      ]}
                    >
                      <Select
                        options={
                          listCity.map((city, index) => (
                            { label: city.TenThanhPho, value: city._id }
                          ))
                        }
                      />
                    </Form.Item>
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
            <Button type="primary" htmlType="submit">
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