import React from 'react';
import PropTypes from 'prop-types';
import "./AccommodationPictures.scss"
import { Upload, Button, message } from 'antd';
import { CloudUploadOutlined, FileImageOutlined } from '@ant-design/icons';
import { viewImageByFileOnBrowser } from 'assets/globaJS';
import { useDispatch, useSelector } from 'react-redux';
import { addImg, setTab } from 'features/Auth/authSlice';

AccommodationPictures.propTypes = {

};

// handle getbase64 file 
const getbase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = err => reject(err);
    })
}

function AccommodationPictures(props) {

    const { imageHotel } = useSelector(state => state.aboutInfo);
    const [images, setImages] = React.useState([]);

    console.log(imageHotel);

    const handleBeforeUpload = (file) => {
        const typesImage = ['image/jpeg', 'image/png'];
        if (!typesImage.includes(file.type)) {
            message.error(`File không hợp lệ !. Chỉ chấp nhận file ảnh có dạng [ ${typesImage} ]`);
            return true;
        }

        return false;
    }
    const { onSaveImages } = props;
    const handleUpload = async ({ file, fileList }) => {
        //uploaded successfully
        if (!file.status) {
            const base64 = await getbase64(file);

            setImages(prev => [
                ...prev,
                {
                    file,
                    base64,
                }
            ]);
            console.log(file);
        }
    }

    const dispatch = useDispatch();

    const handleSubmit = () => {
        dispatch(setTab({
            key: 'next',
            tab: 4,
        }));
    }

    React.useEffect(() => {
        const newImages = images.map((image) => image.file)
        onSaveImages(newImages);
    }, [images])

    return (
        <div className='accommodation-pictures'>
            <div className='box'>
                <div className='accommodation-pictures__subtitle'>Thư viện ảnh</div>
                <Upload.Dragger
                    name="avatar"
                    listType="picture-card"
                    multiple
                    beforeUpload={(file) => handleBeforeUpload(file)}
                    onChange={(e) => handleUpload(e)}
                    className="avatar-uploader" >
                    <span className='accommodation-pictures__text'>Kéo và thả hình ảnh tại đây</span>
                    <div className='accommodation-pictures__addgroup'>
                        <span className='or'>hoặc</span>
                        <Button type='primary' icon={<FileImageOutlined />}>Thêm ảnh</Button>
                    </div>
                </Upload.Dragger>
                <ul className='accommodation-pictures__pictures'>
                    {
                        images?.map((image) => <li key={image.file.uid} className='accommodation-pictures__pictures__picture'>
                            <img src={image.base64} alt='fileupload' width={200} height={200} />
                            <div className='accommodation-pictures__pictures__picture__controls'>
                                {/* <div onClick={() => alert(image.file.uid)} className='accommodation-pictures__pictures__picture__controls__edit'>
                                    <i class="bi bi-pencil-fill"></i>
                                    Sửa
                                </div> */}
                                <div onClick={() => setImages(prev => [...prev.filter(({ file }) => file.uid !== image.file.uid)])} className='accommodation-pictures__pictures__picture__controls__edit'>
                                    <i class="bi bi-trash"></i>
                                    Xóa
                                </div>
                            </div>
                        </li>

                        )
                    }
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
            <Button className='w-75 mt-3' type='primary' htmlType='submit' onClick={handleSubmit} >Tiếp tục</Button>
        </div>
    );
}

export default AccommodationPictures;