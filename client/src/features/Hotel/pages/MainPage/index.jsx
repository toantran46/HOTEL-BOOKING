import React from 'react';
// import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Input } from 'reactstrap';

import "./MainPage.scss";
import { Link, useLocation } from 'react-router-dom';

import FilterItem from 'features/Hotel/components/FilterItem';
import HotelOverView from 'features/Hotel/components/PlaceOverView';
import Pagination from 'features/Hotel/components/PaginationStyled';
import FilterLoading from 'features/Hotel/components/FilterLoading';
import ListPlaceOverView from 'features/Hotel/components/ListPlaceOverView';
import FormSearch from 'features/Hotel/components/FormSearch';
import BreadcrumbStyled from 'features/Hotel/components/BreadcrumbStyled';
import { choNghiApi } from 'api/ChoNghiApi';
import { phanHoiApi } from 'api/PhanHoiApi';
import { tienNghiApi } from 'api/TienNghiApi';
import { loaiChoNghiApi } from 'api/LoaiChoNghiApi';
import { useSelector } from 'react-redux';


MainPage.propTypes = {

};

function MainPage(props) {

    const { state } = useLocation();

    //get data from redux
    const { searchValue, receiveDate, returnDate, placeChoosen } = useSelector(state => state.hotelInfo.homePage);

    //refresh data
    const [isGetNewData, setIsGetNewData] = React.useState(false);


    //save data for sidebar
    const [groupByPlaceType, setGroupByPlaceType] = React.useState([]);
    const [groupByRank, setGroupByRank] = React.useState([]);
    const [groupByScore, setGroupByScore] = React.useState([]);
    const [groupByConvenients, setGroupByConvenients] = React.useState([]);

    //save places
    const [places, setPlaces] = React.useState([]);
    const [totalPlace, setTotalPlaces] = React.useState();

    //pagination
    const [pagination, setPagination] = React.useState({ _page: 1, _limit: 2, _totalPage: 5 });

    //data for filter ( { DiemDanhGia: [], XepHang: [], TienNghi: [] ,LoaiChoNghi:[] } )
    const [filter, setFilter] = React.useState({ DiemDanhGia: [], XepHang: [], TienNghi: [], LoaiChoNghi: [] });
    const [isFiltering, setIsFiltering] = React.useState(false);

    const isSecondTime = React.useRef(false);

    //handle filter after onchange
    const handleFilter = filterInfo => {

        //check for UI filterLoading
        isSecondTime.current = isSecondTime.current || true;

        // filterInfo = [ { checked: true , type: "DiemDanhGia" ,value: 8  }  ]
        const { checked, value, type } = filterInfo;

        checked ? setFilter(prev => ({ ...prev, [type]: [...prev[type], value] }))
            : setFilter(prev => {
                let newType = prev[type]?.filter(item => item !== value);
                return ({ ...prev, [type]: newType });
            });

        checked && setIsFiltering(true);
    }

    //handle search
    const handleSearch = () => {
        setIsGetNewData(prev => !prev);
    }


    //fetch data 
    React.useEffect(() => {
        const fetchGroupByRank = async () => {
            try {
                const { ChoNghis } = await choNghiApi.getAll({ groupBy: "XepHang" });

                const data = [
                    { _id: 1, content: "1 sao", num: 0 },
                    { _id: 2, content: "2 sao", num: 0 },
                    { _id: 3, content: "3 sao", num: 0 },
                    { _id: 4, content: "4 sao", num: 0 },
                    { _id: 5, content: "5 sao", num: 0 },
                ]
                console.log({ data });
                ChoNghis.forEach(ChoNghi => data.splice(ChoNghi.XepHang - 1, 1, { _id: ChoNghi._id, content: `${ChoNghi.XepHang} sao`, num: ChoNghi.TongSo }));
                setGroupByRank(data);

            } catch (error) {
                console.log(error)
            }
        }
        fetchGroupByRank();
    }, [])

    React.useEffect(() => {
        const fetchGroupByScore = async () => {
            try {
                const { PhanHois } = await phanHoiApi.getAll({ groupBy: "DiemDanhGia" });
                const data = PhanHois.map(PhanHoi => ({ _id: PhanHoi._id, content: PhanHoi.DiemDanhGia, num: PhanHoi.TongSo }))
                setGroupByScore(data);

            } catch (error) {
                console.log(error)
            }
        }
        fetchGroupByScore();
    }, [])

    React.useEffect(() => {
        const fetchGroupByPlaceType = async () => {
            try {
                const { LoaiChoNghis } = await loaiChoNghiApi.getAll({ action: "getTotalPlace" });
                const data = LoaiChoNghis.map(LoaiChoNghi => ({ _id: LoaiChoNghi._id, content: LoaiChoNghi.TenLoaiChoNghi, num: LoaiChoNghi.TongSo }))
                setGroupByPlaceType(data);

            } catch (error) {
                console.log(error)
            }
        }
        fetchGroupByPlaceType();
    }, [])

    React.useEffect(() => {
        const fetchGroupByConvenients = async () => {
            try {
                const { TienNghis } = await tienNghiApi.getAll({ groupBy: "TienNghi" });
                const data = TienNghis.map(TienNghi => ({ _id: TienNghi._id, content: TienNghi.TenTienNghi, num: TienNghi.TongSo }))
                setGroupByConvenients(data);

            } catch (error) {
                console.log(error)
            }
        }
        fetchGroupByConvenients();
    }, [])

    //fetch places 
    React.useEffect(() => {
        isSecondTime.current && setIsFiltering(true);

        const fetchPlaces = async () => {
            try {

                const query = placeChoosen._idCity ? {
                    _idCity: placeChoosen._idCity,
                    _page: pagination._page, _limit: pagination._limit,
                    filter: JSON.stringify(filter)
                } : {
                    _page: pagination._page, _limit: pagination._limit,
                    filter: JSON.stringify(filter)
                };

                const { ChoNghis, _totalPage, TongSo } = await choNghiApi.getAll(query);
                setPlaces(ChoNghis);
                setPagination(prev => ({ ...prev, _totalPage }));
                setTotalPlaces(TongSo);
                setIsFiltering(false);
            } catch (error) {
                console.log(error)
                setIsFiltering(false);
            }
        }

        setTimeout(() => {
            fetchPlaces();
        }, 2000);
    }, [filter, pagination._page, isGetNewData]);

    //handle Change page

    const handleChangePage = _page => {
        setPagination(prev => ({ ...prev, _page }))
        setIsFiltering(true);
    }



    return (
        <div className='wrapper'>
            <BreadcrumbStyled />
            <div className='wrapper__content'>
                <div className='wrapper__content__left'>
                    <FormSearch
                        onSearch={handleSearch}
                        placeName={placeChoosen.cityName}
                        receiveDate={receiveDate}
                        returnDate={returnDate} />

                    <div className='wrapper__content__left__filter'>
                        <p className='title'>Chọn lọc theo</p>
                        <FilterItem
                            type='LoaiChoNghi'
                            onFilter={handleFilter}
                            title="Các bộ lọc phổ biến"
                            items={groupByPlaceType} />
                        <FilterItem
                            type='XepHang'
                            onFilter={handleFilter}
                            title="Xếp hạng sao"
                            items={groupByRank} />
                        {/* <FilterItem
                            title="Các hoạt động thú vị"
                            items={
                                [
                                    { content: "Bãi biển", num: 342 },
                                    { content: "Đi bộ đường dài", num: 114 },
                                    { content: "Khu vực bãi tắm riêng", num: 144 },
                                    { content: "Ca-nô", num: 104 },
                                    { content: "Phòng tắm chung", num: 90 },
                                    { content: "Massage", num: 55 },
                                ]} /> */}
                        <FilterItem
                            type='DiemDanhGia'
                            onFilter={handleFilter}
                            title="Điểm đánh giá của khách"
                            items={groupByScore} />
                        <FilterItem
                            type='TienNghi'
                            onFilter={handleFilter}
                            title="Tiện nghi phòng"
                            items={groupByConvenients} />
                    </div>


                </div>
                <div className='wrapper__content__right'>
                    <p className='wrapper__content__right__search-result'>{placeChoosen.cityName}: {totalPlace > 0 ? `tìm thấy ${totalPlace} chỗ nghỉ` : "không tìm thấy chổ nghĩ phù hợp"} </p>
                    <ListPlaceOverView
                        isFiltering={isFiltering}
                        places={places}
                        isChoosenDate={(returnDate && receiveDate) ? true : false} />
                    <Pagination t
                        totalPage={pagination._totalPage}
                        currentPage={pagination._page}
                        pageSize={1}
                        onChange={(_page) => handleChangePage(_page)}
                    />
                </div>
            </div>
        </div>
    );
}

export default MainPage;