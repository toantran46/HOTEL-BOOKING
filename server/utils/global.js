
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
                        <h3>?????t ph??ng th??nh c??ng</h3>
                        <div>Xin ch??o <b>${infoBooking.name}</b>,</div>
                        <div>
                            <div><i>LTHBooking</i> v???a nh???n ???????c y??u c???u ?????t ph??ng c???a qu?? kh??ch. Th??ng tin ?????t ph??ng c??? th??? nh??
                                sau:</div>
                            <ul class="list-info">
                                <li><span class="item-title"> Kh??ch s???n:</span><span
                                        class="place-name">${infoBooking.placeName}</span>
                                </li>
                                <li> <span class="item-title"> ?????a
                                        ch???:</span><span>${infoBooking.placeAddress}</span> </li>
                                <li class="item"> <span class="item-title">
                                        Ph??ng:</span>
                                    <div>
                                        ${infoBooking.room.map((rm) => `<div>[${rm.quantity + "] " + rm.name}</div>`).join("")}
                                    </div>
                                </li>
                                <li> <span class="item-title"> Nh???n
                                        ph??ng:</span><span>${infoBooking.receiveDate}</span> </li>
                                <li> <span class="item-title"> Tr???
                                        ph??ng:</span><span>${infoBooking.returnDate}</span> </li>
                                <li> <span class="item-title"> Tr???ng
                                        th??i:</span><span>${infoBooking.status}.</span> </li>
                                <li class="mt-1"> <span class="item-title">
                                        T???ng ti???n:</span><span class="total-price">${convertToMoney(infoBooking.totalPrice)}
                                        VND.</span> </li>
                            </ul>
                            <br>
                            <p>Mong qu?? kh??ch c?? m???t v??o kho???ng <b>${infoBooking.intentTime}h ng??y ${infoBooking.receiveDate}</b> ????? ho??n
                                t???t th??? t???c nh???n ph??ng.</p>
                            <p>
                                Ch??c qu?? kh??ch c?? m???t chuy???n du l???ch ????ng nh???, nhi???u ni???m vui v?? ???????c tr???i nghi???m nh???ng d???ch v???
                                tuy???t v???i t???i ${infoBooking.placeName}.
                            </p>
                            <hr>
                            <div><i>Tr??n tr???ng.</i></div>
            
                            <i>N???u qu?? kh??ch c?? th???c m???c vui l??ng li??n h??? ${process.env.MAIL_USER}.</i>
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
                        <h3>Kh??ch h??ng ?????t ph??ng th??nh c??ng</h3>
                        <div>Xin ch??o <b>${infoBooking.placeName}</b>,</div>
                        <div>
                            <div><i>LTHBooking</i> v???a nh???n ???????c y??u c???u ?????t ph??ng c???a kh??ch h??ng <b>${infoBooking.name}</b>. Th??ng
                                tin ?????t ph??ng c??? th??? nh?? sau:</div>
                            <ul class="list-info">
                                <li><span class="item-title"> Email
                                        KH:</span><span>${infoBooking.email}</span> </li>
                                <li> <span class="item-title"> S??T
                                        KH:</span><span>${infoBooking.phone}</span> </li>
                                <li> <span class="item-title"> Lo???i
                                        KH:</span><span>${infoBooking.userType}</span> </li>
                                <li class="item"> <span class="item-title">
                                        Ph??ng:</span>
                                    <div>
                                        ${infoBooking.room.map((rm) => `<div>[${rm.quantity + "] " + rm.name}</div>`).join("")}
                                    </div>
                                </li>
                                <li> <span class="item-title"> Nh???n
                                        ph??ng:</span><span>${infoBooking.intentTime}h<i class="intent-time">(d??? ki???n) </i> ${infoBooking.receiveDate}</span> </li>
                                <li> <span class="item-title"> Tr???
                                        ph??ng:</span><span>${infoBooking.returnDate}</span> </li>
                                <li> <span class="item-title"> Tr???ng
                                        th??i:</span><span>${infoBooking.status}.</span> </li>
                                <li class="mt-1"> <span class="item-title"> T???ng
                                        ti???n:</span><span class="total-price">${convertToMoney(infoBooking.totalPrice)} VND.</span>
                                </li>
                            </ul>
                            <br />
                            <p>
                                H??y n??? l???c l??m th???t t???t nh???ng g?? b???n c?? v?? h??n th??? n???a ?????n m???c kh??ch h??ng mu???n quay l???i v???i b???n
                                trong t????ng lai.
                            </p>
                            <hr />
                            <div><i>Tr??n tr???ng.</i></div>
                            <i>N???u qu?? kh??ch c?? th???c m???c vui l??ng li??n h??? ${process.env.MAIL_USER}.</i>
                        </div>
                    </div>
                </div>
            </body>
            
            </html>`;
        }


        switch (type) {
            case "booked-to-user": return { subject: "Th??ng b??o ?????t ph??ng th??nh c??ng", html: bookedHtmlToUser() };
            case "booked-to-owner": return { subject: "Th??ng b??o kh??ch h??ng ?????t ph??ng th??nh c??ng", html: bookedHtmlToOwner() };
        }
    },

} 