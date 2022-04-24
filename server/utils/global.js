
module.exports = {
    getDefaultSubjectByType: (type, infoBooking) => {

        const styles = `<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
            <style>
            body{
                    color:#000 !important;
                }

                .wrapper {
                    font-size: 14;
                }
        
                .header {
                    background-color: #003580;
                    padding: 0.75rem;
                }
        
                .header-main {
                    font-size: 25px;
                    font-weight: bold;
                    margin-left: 4rem;
                    color: #FFF!important;
                }
        
                .main-content {
                    margin-left: 4rem;
                    margin-top: 1rem;
                }
        
                .list-info {
                    margin: 0.8rem 0;
                }
        
                .item {
                    display: flex;
                }
        
                .item-title {
                    min-width: 100px;
                    display: inline-block
                }
        
                .place-name {
                    font-weight: "500";
                    font-size: 15
                }
        
                .mt-1 {
                    margin-top: 1rem;
                }
        
                .total-price {
                    font-weight: 500;
                    font-size: 18;
                    padding: 5px 10px;
                    border: 1px solid rgb(0, 53, 128);
                    color: rgb(0, 53, 128)!important;
                }
                .intent-time{
                    fon-size:12;
                }
            </style>
        </head>
        
        <body>`;

        const convertToMoney = num => {
            return new Intl.NumberFormat().format(num);
        }

        const bookedHtmlToUser = () => {
            return styles + ` 
                <div class="wrapper">
                    <div class="header">
                        <div class="header-main">
                            <div>LTHBooking.vn</div>
                        </div>
                    </div>
                    <div class="main-content">
                        <h3>Đặt phòng thành công</h3>
                        <div>Xin chào <b>${infoBooking.name}</b>,</div>
                        <div>
                            <div><i>LTHBooking</i> vừa nhận được yêu cầu đặt phòng của quý khách. Thông tin đặt phòng cụ thể như
                                sau:</div>
                            <ul class="list-info">
                                <li><span class="item-title"> Khách sạn:</span><span
                                        class="place-name">${infoBooking.placeName}</span>
                                </li>
                                <li> <span class="item-title"> Địa
                                        chỉ:</span><span>${infoBooking.placeAddress}</span> </li>
                                <li class="item"> <span class="item-title">
                                        Phòng:</span>
                                    <div>
                                        ${infoBooking.room.map((rm) => `<div>[${rm.quantity + "] " + rm.name}</div>`).join("")}
                                    </div>
                                </li>
                                <li> <span class="item-title"> Nhận
                                        phòng:</span><span>${infoBooking.receiveDate}</span> </li>
                                <li> <span class="item-title"> Trả
                                        phòng:</span><span>${infoBooking.returnDate}</span> </li>
                                <li> <span class="item-title"> Trạng
                                        thái:</span><span>${infoBooking.status}.</span> </li>
                                <li class="mt-1"> <span class="item-title">
                                        Tổng tiền:</span><span class="total-price">${convertToMoney(infoBooking.totalPrice)}
                                        VND.</span> </li>
                            </ul>
                            <br>
                            <p>Mong quý khách có mặt trước <b>${infoBooking.intentTime}h ngày ${infoBooking.receiveDate}</b> để hoàn
                                tất thủ tục nhận phòng.</p>
                            <p>
                                Chúc quý khách có một chuyến du lịch đáng nhớ, nhiều niềm vui và được trải nghiệm những dịch vụ
                                tuyệt vời tại infoBooking.placeName.
                            </p>
                            <hr>
                            <div><i>Trân trọng.</i></div>
            
                            <i>Nếu quý khách có thắc mắc vui lòng liên hệ ${process.env.MAIL_USER}.</i>
                        </div>
                    </div>
                </div>
            </body>
            
            </html>`
        };

        const bookedHtmlToOwner = () => {
            return styles + `
                <div class="wrapper">
                    <div class="header">
                        <div class="header-main">
                            <div>LTHBooking.vn</div>
                        </div>
                    </div>
                    <div class="main-content">
                        <h3>Khách hàng đặt phòng thành công</h3>
                        <div>Xin chào <b>${infoBooking.placeName}</b>,</div>
                        <div>
                            <div><i>LTHBooking</i> vừa nhận được yêu cầu đặt phòng của khách hàng <b>${infoBooking.name}</b>. Thông
                                tin đặt phòng cụ thể như sau:</div>
                            <ul class="list-info">
                                <li><span class="item-title"> Email
                                        KH:</span><span>${infoBooking.email}</span> </li>
                                <li> <span class="item-title"> SĐT
                                        KH:</span><span>${infoBooking.phone}</span> </li>
                                <li> <span class="item-title"> Loại
                                        KH:</span><span>${infoBooking.userType}</span> </li>
                                <li class="item"> <span class="item-title">
                                        Phòng:</span>
                                    <div>
                                        ${infoBooking.room.map((rm) => `<div>[${rm.quantity + "] " + rm.name}</div>`).join("")}
                                    </div>
                                </li>
                                <li> <span class="item-title"> Nhận
                                        phòng:</span><span>${infoBooking.intentTime}h<i class="intent-time">(dự kiến) </i> ${infoBooking.receiveDate}</span> </li>
                                <li> <span class="item-title"> Trả
                                        phòng:</span><span>${infoBooking.returnDate}</span> </li>
                                <li> <span class="item-title"> Trạng
                                        thái:</span><span>${infoBooking.status}.</span> </li>
                                <li class="mt-1"> <span class="item-title"> Tổng
                                        tiền:</span><span class="total-price">${convertToMoney(infoBooking.totalPrice)} VND.</span>
                                </li>
                            </ul>
                            <br />
                            <p>
                                Hãy nỗ lực làm thật tốt những gì bạn có và hơn thế nữa đến mức khách hàng muốn quay lại với bạn
                                trong tương lai.
                            </p>
                            <hr />
                            <div><i>Trân trọng.</i></div>
                            <i>Nếu quý khách có thắc mắc vui lòng liên hệ ${process.env.MAIL_USER}.</i>
                        </div>
                    </div>
                </div>
            </body>
            
            </html>`;
        }


        switch (type) {
            case "booked-to-user": return { subject: "Thông báo đặt phòng thành công", html: bookedHtmlToUser() };
            case "booked-to-owner": return { subject: "Thông báo khách hàng đặt phòng thành công", html: bookedHtmlToOwner() };
        }
    },

} 