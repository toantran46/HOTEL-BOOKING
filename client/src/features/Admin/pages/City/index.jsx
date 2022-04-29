import { Form } from "antd";
import { phongApi } from "api/PhongApi";
import { thanhPhoApi } from "api/ThanhPhoApi";
import BTInputField from "custom-fields/BTInputField";
import CityForm from "features/Admin/components/CityForm";
import DeleteModal from "features/Admin/components/DeleteModal";
import DetailModal from "features/Admin/components/DetailModal";
import Pagination from "features/Admin/components/Pagination";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Badge, Table } from "reactstrap";
import { message } from 'antd';

import { formatMoney } from "utils/format";
import "./city.scss";
import PaginationStyled from "features/Hotel/components/PaginationStyled";

function CityPage(props) {
    const [cities, setCities] = useState([]);
    const [showCityModal, setShowCityModal] = useState(false);
    const [showDeleteCityModal, setShowDeleteCityModal] = useState(false);
    const [selectedCity, setSelectedCity] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const [getNewData, setGetNewData] = useState(false);

    const [isEdit, setIsEdit] = useState(false);
    const [pagination, setPagination] = useState({ page: 1, totalPage: 5, limit: 5 });


    useEffect(() => {
        const fetchCity = async () => {
            try {
                const { ThanhPhos, totalPage } = await thanhPhoApi.getAll({ _page: pagination.page, _limit: pagination.limit });
                setCities(ThanhPhos);
                setPagination(prev => ({ ...prev, totalPage }))

            } catch (error) {
                console.log(error);
            }
        };
        fetchCity();
    }, [getNewData, pagination.page]);

    //handle change page 
    const handleChangePage = page => {
        setPagination(prev => ({ ...prev, page }))
    }

    const showModal = (City) => {
        setShowCityModal(true);
        setSelectedCity(City);
    };

    const hideModal = () => {
        setShowCityModal(false);
    };

    const showDeleteModal = (City) => {
        setShowDeleteCityModal(true);
        setSelectedCity(City);
    };

    const hideDeleteModal = () => {
        setShowDeleteCityModal(false);
    };

    const handleRemoveCity = async () => {
        try {
            setIsLoading(true);
            const response = await thanhPhoApi.delete(selectedCity._id);
            message.success(response.message);
            setIsLoading(false);
            setShowDeleteCityModal(false);
            setGetNewData(prev => !prev);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    //handle edit and add
    const handleEditAndAdd = async (values) => {
        try {
            const file = values.image[0].originFileObj;
            let data;
            //is Edit
            if (isEdit) {
                if (file) {
                    data = new FormData();
                    data.append("TenThanhPho", values.cityName);
                    data.append("HinhAnh", file);
                } else {
                    data = { TenThanhPho: values.cityName };
                }
                setIsLoading(true);
                const response = await thanhPhoApi.update(selectedCity._id, data);
                setIsLoading(false);
                message.success(response.message);
            }
            //is add 
            else {
                data = new FormData();
                data.append("TenThanhPho", values.cityName);
                data.append("HinhAnh", file);
                setIsLoading(true);
                const response = await thanhPhoApi.add(data);
                setIsLoading(false);
                message.success(response.message);
            }

            setGetNewData(prev => !prev);
            hideModal()

        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    return (
        <div className="city-list shadow-sm">
            <div className="city-list__add-btn">
                <div
                    onClick={() => { showModal(null); setIsEdit(false) }}
                    className="city-list__action shadow-sm  bg-info ">
                    <i class="bi bi-plus-lg"></i>
                </div>
            </div>
            <div className="table-responsive">
                <Table className="table table-sm table-hover align-middle">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cities.map((city, index) => (
                            <tr className="" key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    <img src={city.HinhAnh} alt="image" />
                                </td>
                                <td>
                                    <Badge color="dark">{city.TenThanhPho}</Badge>
                                </td>

                                <td>
                                    <div className="city-list__actions">
                                        <div
                                            onClick={() => { showModal(city); setIsEdit(true) }}
                                            className="city-list__action shadow-sm bg-primary" >
                                            <i class="bi bi-pencil"></i>
                                        </div>

                                        <div
                                            onClick={() => showDeleteModal(city)}
                                            className="city-list__action shadow-sm bg-danger"
                                        >
                                            <i className="fa-solid fa-trash city-list__icon"></i>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            {/* Pagination */}
            <PaginationStyled currentPage={pagination.page} totalPage={pagination.totalPage} onChange={handleChangePage} />

            {/* City Detail Modale */}
            <DetailModal isOpen={showCityModal} hideModal={hideModal} size="md" >
                <CityForm isEdit={isEdit} selectedCity={selectedCity} onSubmit={handleEditAndAdd} isLoading={isLoading} />
            </DetailModal>

            {/* City Delete Modale */}
            <DeleteModal
                isLoading={isLoading}
                isOpen={showDeleteCityModal}
                hideDeleteModal={hideDeleteModal}
                handleRemove={handleRemoveCity}
            />
        </div>
    );
}

export default CityPage;
