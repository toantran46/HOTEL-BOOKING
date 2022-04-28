import React from 'react';
import PropTypes from 'prop-types';
import HeaderAbout from 'features/Auth/components/HeaderAbout';
import NavStep from 'features/Auth/components/NavStep';
import InforBasic from './InforBasic';

import './About.scss';

import FooterAbout from 'features/Auth/components/FooterAbout';
import LayoutNPrice from './LayoutNPrice';
import AccommodationPictures from './AccommodationPictures';
import MainTitle from './MainTitle';
import Policy from './Policy';
import Payment from './Payment';
import ConvenientNService from './ConvenientNService';
import { useSelector } from 'react-redux';
About.propTypes = {

};

function About(props) {
    const { tab } = useSelector(state => state.aboutInfo);

    // console.log({ tab });
    const handleSubmitInfor = (values) => {
        console.log(values);
    }
    const handleSubmitLayoutNPrice = (values) => {
        console.log(values);
    }

    const [images, setImages] = React.useState([]);

    const handleSaveImage = (files) => {

        setImages(files);

    }
    return (
        <div className='about'>
            <HeaderAbout />
            <NavStep currentTab={tab} />

            {tab === 1 && <div className='about__tab'>
                <MainTitle main='Quý vị đang làm tốt lắm, hãy tiếp tục!' sub='Hãy bắt đầu bằng cách cho chúng tôi biết tên, địa chỉ cùng chi tiết liên hệ của chỗ nghỉ.' />
                <div> <InforBasic onSubmit={handleSubmitInfor}
                /> </div>
            </div>

            }
            {
                tab === 2 && <div className='about__tab'>
                    <MainTitle main='Bố cục và giá' sub='Hãy cho chúng tôi biết về phòng đầu tiên của Quý vị. Sau khi nhập tất cả các thông tin cần thiết, Quý vị sẽ có thể nhập chi tiết cho các phòng khác.' />
                    <div> <LayoutNPrice onSubmit={handleSubmitLayoutNPrice} /> </div>
                </div>

            }

            {
                tab === 3 && <div className='about__tab'>
                    <MainTitle main='Tiện nghi và dịch vụ' sub='Hãy cho chúng tôi biết về tiện nghi, internet, chỗ đậu xe và ngôn ngữ của chỗ nghỉ.' />
                    <div> <ConvenientNService /> </div>
                </div>
            }

            {
                tab === 4 && <div className='about__tab'>
                    <MainTitle main='Hình ảnh chỗ nghỉ' sub='Hình ảnh đẹp giống như lời mời gọi hấp dẫn về một trải nghiệm trọn vẹn tại chỗ nghỉ, hãy đăng tải những hình có độ phân giải cao và thể hiện chính xác những gì chỗ nghỉ Quý vị có. Chúng tôi sẽ hiển thị những hình này trong trang chỗ nghỉ của Quý vị trên trang web Booking.com.' />
                    <AccommodationPictures onSaveImages={handleSaveImage} />
                </div>
            }
            {
                tab === 5 && <div className='about__tab'>
                    <MainTitle main='Chính sách' sub='Hãy liệt kê chi tiết các chính sách cơ bản. Quý vị có cho phép trẻ em hay thú cưng đến nghỉ không? Quý vị có thể linh hoạt với việc hủy đặt phòng đến mức nào?' />
                    <Policy />
                </div>
            }
            {
                tab === 6 && <div className='about__tab'>
                    <MainTitle main='Thanh toán' sub='Vui lòng nêu phương thức thanh toán Quý vị chấp nhận, các chi tiết về thuế cùng với những lựa chọn khác như các loại phụ phí.' />
                    <Payment listImages={images} />
                </div>
            }


            <FooterAbout />
        </div>
    );
}

export default About;