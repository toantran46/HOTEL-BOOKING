import React from 'react';
import PropTypes from 'prop-types';
import "./Note.scss";
import { ScrollToView } from 'assets/globaJS';
Note.propTypes = {

};

function Note(props) {
    return (
        <div className='note' id='note'>
            <div className='note__header'>
                <div className='note__header__title'>Ghi chú</div>
                <a className="btn-primary" onClick={() => ScrollToView("empty-room")}>Xem phòng trống</a>
            </div>
            <div className="note__wrapper">
                Tuân theo các hướng dẫn của chính phủ để giảm thiểu sự lây lan của virus corona (COVID-19), chỗ nghỉ này chỉ có thể nhận đặt phòng từ người lao động trong những ngành then chốt hoặc du khách được cho phép trong thời gian hướng dẫn còn hiệu lực. Người đó phải xuất trình giấy tờ hợp lý để chứng minh điều này khi đến.<span className='break' /> Nếu không thể cung cấp giấy tờ, đặt phòng của bạn sẽ bị hủy khi đến.
                Tuân theo các hướng dẫn của chính phủ để giảm thiểu sự lây lan của virus corona (COVID-19), chỗ nghỉ này hiện không nhận khách từ một số quốc gia nhất định trong thời gian hướng dẫn còn hiệu lực.<span className='break' />

                Tuân theo các hướng dẫn của chính phủ để giảm thiểu sự lây lan của virus corona (COVID-19), chỗ nghỉ này có thể yêu cầu khách cung cấp giấy tờ bổ sung để xác nhận danh tính, hành trình du lịch và các thông tin liên quan khác trong thời gian hướng dẫn còn hiệu lực.<span className='break' />

                Do dịch virus corona (COVID-19), các biện pháp an toàn và vệ sinh bổ sung hiện đang được thực hiện tại chỗ nghỉ này.<span className='break' />

                Các dịch vụ ăn uống tại chỗ nghỉ này có thể bị giới hạn hoặc không hoạt động do dịch virus corona (COVID-19).<span className='break' />

                Do dịch virus corona (COVID-19), chỗ nghỉ này đã tạm ngưng cung cấp dịch vụ xe trung chuyển.<span className='break' />

                Do dịch virus corona (COVID-19), chỗ nghỉ này đang thực hiện các bước để bảo vệ sự an toàn của khách và nhân viên. Vì vậy, một số dịch vụ và tiện nghi cụ thể có thể sẽ bị giảm hoặc không hoạt động.<span className='break' />

                Do dịch virus corona (COVID-19), chỗ nghỉ này đã rút ngắn giờ hoạt động của bên tiếp tân và các dịch vụ.<span className='break' />

                Các tiện nghi spa và gym tại chỗ nghỉ này hiện không hoạt động vì dịch virus corona (COVID-19).<span className='break' />

                Chỗ nghỉ này không nhận tổ chức tiệc chia tay cuộc đời độc thân hay các bữa tiệc tương tự như vậy.<span className='break' />

                Vui lòng thông báo trước cho Merry House Imperia về thời gian đến dự kiến của quý khách. Khách có thể sử dụng ô Yêu cầu Đặc biệt khi đặt phòng hoặc liên lạc trực tiếp với chỗ nghỉ qua các thông tin liên hệ được ghi trong xác nhận đặt phòng.<span className='break' />

                Khách cần phải xuất trình giấy tờ tùy thân có ảnh và thẻ tín dụng vào thời điểm nhận phòng. Vui lòng lưu ý tất cả các Yêu cầu Đặc biệt đều tùy thuộc vào tình trạng phòng trống và phụ phí có thể sẽ được tính thêm.<span className='break' />

                Khách được yêu cầu thanh toán qua chuyển khoản ngân hàng trước khi tới nơi. Chỗ nghỉ sẽ liên hệ với bạn sau khi đặt phòng để hướng dẫn chuyển khoản.<span className='break' />

                Bể bơi ngoài trời công viên Pháp tạm ngừng hoạt động từ T2 Ngày 15 Tháng 11 Năm 2021 đến T5 Ngày 14 Tháng 4 Năm 2022<span className='break' />

                Bể bơi ngoài trời công viên Ý tạm ngừng hoạt động từ T2 Ngày 15 Tháng 11 Năm 2021 đến T5 Ngày 14 Tháng 4 Năm 2022<span className='break' />
            </div>
        </div>
    );
}

export default Note;