import React from 'react';
// import PropTypes from 'prop-types';
import { Breadcrumb, BreadcrumbItem, Form, FormGroup, Input } from 'reactstrap';

import "./MainPage.scss";
import { Link, useLocation } from 'react-router-dom';

import FilterItem from 'features/Hotel/components/FilterItem';
import Pagination from 'features/Hotel/components/PaginationStyled';
import ListPlaceOverView from 'features/Hotel/components/ListPlaceOverView';
import FormSearch from 'features/Hotel/components/FormSearch';
import BreadcrumbStyled from 'features/Hotel/components/BreadcrumbStyled';
import { choNghiApi } from 'api/ChoNghiApi';
import { phanHoiApi } from 'api/PhanHoiApi';
import { tienNghiApi } from 'api/TienNghiApi';
import { loaiChoNghiApi } from 'api/LoaiChoNghiApi';
import { useSelector, useDispatch } from 'react-redux';

import { Spin, message } from 'antd'

import { choosePlace } from "features/Hotel/HotelSlice";

import { thanhPhoApi } from 'api/ThanhPhoApi';


MainPage.propTypes = {

};

function MainPage(props) {

    const { state } = useLocation();

    //get data from redux
    const { searchValue, receiveDate, returnDate, placeChoosen } = useSelector(state => state.hotelInfo.homePage);
    const dispatch = useDispatch();

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

    //data for filter ( { DiemDanhGia: [], XepHang: [], TienNghi: [] ,LoaiChoNghi:["MaKhachSan": "default" ] } )
    const [filter, setFilter] = React.useState(() => ({ DiemDanhGia: [], XepHang: [], TienNghi: [], LoaiChoNghi: state?.placeType ? [state.placeType] : ["62355779163a837aa7127013"] }));
    const [isFiltering, setIsFiltering] = React.useState(false);


    const isFirstLoading = React.useRef(true);

    //handle filter after onchange
    const handleFilter = filterInfo => {

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
    const handleSearch = (searchValue) => {
        const fetchPlaceBySearchValue = async () => {
            try {
                const { ChoNghis } = await choNghiApi.getAll({ search: searchValue, _limit: 1 });

                if (ChoNghis.length > 0) {
                    dispatch(choosePlace({
                        _id: ChoNghis[0]._id,
                        placeName: ChoNghis[0].TenChoNghi,
                        _idCity: ChoNghis[0].ThanhPho[0]._id,
                        cityName: ChoNghis[0].ThanhPho[0].TenThanhPho
                    }));

                } else {
                    const { ThanhPhos } = await thanhPhoApi.getAll({ search: searchValue, _limit: 1 });

                    if (ThanhPhos.length > 0) {
                        dispatch(choosePlace({
                            _id: null,
                            placeName: null,
                            _idCity: ThanhPhos[0]?._id,
                            cityName: ThanhPhos[0]?.TenThanhPho
                        }));
                    } else {
                        dispatch(choosePlace({
                            _id: null,
                            placeName: null,
                            _idCity: null,
                            cityName: searchValue
                        }));
                    }

                }

                setIsGetNewData(prev => !prev);

            } catch (error) {
                console.log(error)
            }
        }
        fetchPlaceBySearchValue();

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
        //check when search but haven't city 
        if (placeChoosen.cityName && !placeChoosen._idCity) {
            setPlaces([]);
            setTotalPlaces(0);
            isFirstLoading.current = false;
            setIsFiltering(false);
            return;
        }

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
                isFirstLoading.current = false;
                setPlaces(ChoNghis);
                setPagination(prev => ({ ...prev, _totalPage }));
                setTotalPlaces(TongSo);
                setIsFiltering(false);
            } catch (error) {
                console.log(error)
                isFirstLoading.current = false;
                setIsFiltering(false);
            }
        }

        setIsFiltering(true);
        setTimeout(() => {
            fetchPlaces();
        }, 2000);
    }, [filter, pagination._page, isGetNewData, placeChoosen._idCity]);

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
                        returnDate={returnDate}
                    />

                    <div className='wrapper__content__left__filter'>
                        <p className='title'>Chọn lọc theo</p>
                        <FilterItem
                            defaultChecked={filter.LoaiChoNghi}
                            type='LoaiChoNghi'
                            onFilter={handleFilter}
                            title="Các bộ lọc phổ biến"
                            items={groupByPlaceType} />
                        <FilterItem
                            defaultChecked={filter.XepHang}
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
                            defaultChecked={filter.DiemDanhGia}
                            type='DiemDanhGia'
                            onFilter={handleFilter}
                            title="Điểm đánh giá của khách"
                            items={groupByScore} />
                        <FilterItem
                            defaultChecked={filter.TienNghi}
                            type='TienNghi'
                            onFilter={handleFilter}
                            title="Tiện nghi phòng"
                            items={groupByConvenients} />
                    </div>


                </div>
                <div className='wrapper__content__right'>
                    <p className='wrapper__content__right__search-result'>{placeChoosen.cityName || "Tất cả"}: {isFiltering ? <Spin /> : totalPlace > 0 ? `tìm thấy ${totalPlace} chỗ nghỉ` : "không tìm thấy chổ nghĩ phù hợp"} </p>
                    <ListPlaceOverView
                        isFirstLoading={isFirstLoading.current}
                        isFiltering={isFiltering}
                        places={places}
                        isChoosenDate={(returnDate && receiveDate) ? true : false} />
                    <Pagination
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