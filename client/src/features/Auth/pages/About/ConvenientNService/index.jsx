import React from 'react';
import PropTypes from 'prop-types';

import './ConvenientNService.scss';
import { Col, Label } from 'reactstrap';
import { Button, Form, Input, Radio, Checkbox, Row } from 'antd';

import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addConvenient, setTab } from 'features/Auth/authSlice';
import { tienNghiApi } from 'api/TienNghiApi';

ConvenientNService.propTypes = {

};

function ConvenientNService(props) {

    const [form] = Form.useForm();

    const convenient = useSelector(state => state.aboutInfo);
    const dispatch = useDispatch();

    const [listConvenient, setListConvenient] = React.useState([]);

    React.useEffect(() => {
        form.setFieldsValue(convenient);
    }, [convenient]);

    React.useEffect(() => {
        const fetchTienNghi = async () => {
            try {
                const { TienNghis } = await tienNghiApi.getAll();
                setListConvenient(TienNghis);
            } catch (error) {
                console.log(error);
            }
        }
        fetchTienNghi();
    }, [])

    const handleSubmit = (values) => {
        // console.log(values);
        dispatch(addConvenient(values));
        dispatch(setTab({
            key: 'next',
            tab: 3,
        }));
    };

    const defaultValues = {
        isParking: true,
        isBreakfast: true,
        convenientGroup: [],
    };

    return (
        <div className='convenient-and-service'>
            <div className="row">
                <div className="col-md-9 basic-form">
                    <Form form={form} initialValues={defaultValues} onFinish={handleSubmit} >
                        <fieldset>
                            <Label className='label-big'>
                                Chỗ đậu xe
                            </Label >
                            <div className="describe-block">
                                <div className="describe-block__text">
                                    <p>Thông tin này đặc biệt quan trọng đối với những khách đến chỗ nghỉ của Quý vị bằng ô tô.</p>
                                </div>
                            </div>
                            <Col sm={7} className='form-group'>
                                <Label>
                                    Qúy vị có chỗ đậu xe cho khách không?
                                </Label>
                                <Form.Item name="isParking">
                                    <Radio.Group>
                                        <Radio value={true}>Có</Radio>
                                        <Radio value={false}>Không</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </fieldset>
                        <fieldset>
                            <Label className='label-big'>
                                Bữa sáng
                            </Label>
                            <Col sm={7} className='form-group'>
                                <Label>
                                    Qúy vị có phục vụ bữa sáng cho khách không?
                                </Label>
                                <Form.Item name="isBreakfast">
                                    <Radio.Group>
                                        <Radio value={true}>Có</Radio>
                                        <Radio value={false}>Không</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </fieldset>
                        <fieldset>
                            <Label className='label-big'>
                                Những tiện nghi được khách ưa chuộng
                            </Label>
                            <div className="describe-block">
                                <div className="describe-block__text">
                                    <p>Khách để tâm đến những tiện nghi này nhất khi họ tìm kiếm chỗ nghỉ.</p>
                                </div>
                            </div>
                            <Form.Item name='convenientGroup'>
                                <Checkbox.Group style={{ width: '100%' }}>
                                    <div className="row">
                                        <div className="list-convenient">
                                            <ul>
                                                {listConvenient.map((data, index) => (
                                                    <li><Checkbox value={data._id}>{data.TenTienNghi}</Checkbox></li>
                                                ))}
                                            </ul>

                                        </div>

                                    </div>
                                </Checkbox.Group>
                            </Form.Item>

                        </fieldset>
                        <Button type='primary' htmlType='submit'> Tiếp tục</Button>
                    </Form>
                </div>
                <div className="col-md-3 sticky-col">
                    <p>Sau khi hoàn tất đăng ký, Quý vị vẫn sẽ có thể thực hiện thay đổi cho đăng ký trước khi chỗ nghỉ online.</p>
                </div>
            </div>

        </div >
    );
}

export default ConvenientNService;