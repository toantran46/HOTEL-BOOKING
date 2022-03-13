import React from 'react';
import PropTypes from 'prop-types';
import "./AccommodationPictures.scss"
import { Upload, Button } from 'antd';
import { CloudUploadOutlined, FileImageOutlined } from '@ant-design/icons';

AccommodationPictures.propTypes = {

};

function AccommodationPictures(props) {
    return (
        <div className='accommodation-pictures'>
            <div className='box'>
                <div className='accommodation-pictures__subtitle'>Thư viện ảnh</div>
                <Upload.Dragger
                    name="avatar"
                    listType="picture-card"
                    multiple
                    className="avatar-uploader" >
                    <span className='accommodation-pictures__text'>Kéo và thả hình ảnh tại đây</span>
                    <div className='accommodation-pictures__addgroup'>
                        <span className='or'>hoặc</span>
                        <Button type='primary' icon={<FileImageOutlined />}>Thêm ảnh</Button>
                    </div>
                </Upload.Dragger>
                <ul className='accommodation-pictures__pictures'>

                    <li className='accommodation-pictures__pictures__picture'>
                        <img src='https://q-xx.bstatic.com/xdata/images/property/square200/86568532.jpg?k=3e5017cbd7d93046f08b712d96f72dd1794b67aad34ffd5ec9557f95211c9d79&o=' alt='fileupload' />
                        <div className='accommodation-pictures__pictures__picture__controls'>
                            <div className='accommodation-pictures__pictures__picture__controls__edit'>
                                <i class="bi bi-pencil-fill"></i>
                                Sửa
                            </div>
                            <div className='accommodation-pictures__pictures__picture__controls__edit'>
                                <i class="bi bi-trash"></i>
                                Xóa
                            </div>
                        </div>
                    </li>
                    <li className='accommodation-pictures__pictures__picture'>
                        <img src='https://q-xx.bstatic.com/xdata/images/property/square200/86568532.jpg?k=3e5017cbd7d93046f08b712d96f72dd1794b67aad34ffd5ec9557f95211c9d79&o=' alt='fileupload' />
                        <div className='accommodation-pictures__pictures__picture__controls'>
                            <div className='accommodation-pictures__pictures__picture__controls__edit'>
                                <i class="bi bi-pencil-fill"></i>
                                Sửa
                            </div>
                            <div className='accommodation-pictures__pictures__picture__controls__edit'>
                                <i class="bi bi-trash"></i>
                                Xóa
                            </div>
                        </div>
                    </li>
                    <li className='accommodation-pictures__pictures__picture'>
                        <img src='https://q-xx.bstatic.com/xdata/images/property/square200/86568532.jpg?k=3e5017cbd7d93046f08b712d96f72dd1794b67aad34ffd5ec9557f95211c9d79&o=' alt='fileupload' />
                        <div className='accommodation-pictures__pictures__picture__controls'>
                            <div className='accommodation-pictures__pictures__picture__controls__edit'>
                                <i class="bi bi-pencil-fill"></i>
                                Sửa
                            </div>
                            <div className='accommodation-pictures__pictures__picture__controls__edit'>
                                <i class="bi bi-trash"></i>
                                Xóa
                            </div>
                        </div>
                    </li>

                </ul>
                <div className='accommodation-pictures__information'>
                    <h5>Không có hình ảnh chuyên nghiệp? Không sao!</h5>
                    <ul>
                        <li>
                            <i class="bi bi-caret-right-fill"></i>
                            <div>Quý vị có thể sử dụng:</div>
                            <div><i class="bi bi-phone"></i> Điện thoại thông minh</div>
                            <div><i class="bi bi-camera-fill"></i> Máy ảnh kỹ thuật số</div>
                        </li>
                        <li>
                            <i class="bi bi-caret-right-fill"></i>
                            <div>Nếu không biết ai là chủ sở hữu của bức ảnh, tốt nhất Quý vị không nên sử dụng. Quý vị chỉ nên sử dụng ảnh mình có bản quyền hoặc của một người khác nhưng đã có sự chấp thuận để sử dụng</div>
                        </li>
                    </ul>

                </div>
            </div>
            <Button className='w-75 mt-3' type='primary'>Tiếp tục</Button>
        </div>
    );
}

export default AccommodationPictures;