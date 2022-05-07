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

import "./payment.scss";
import { tinDungApi } from "api/TinDungApi";
import PaymentForm from "features/Admin/components/PaymentForm";
import PaginationStyled from "features/Hotel/components/PaginationStyled";
import { toastError, toastSucsess } from "utils/notifi";

function PaymentPage(props) {
    const [payments, setPayments] = useState([]);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [showDeletePaymentModal, setShowDeletePaymentModal] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState({});

    const [isLoading, setIsLoading] = useState(false);
    const [getNewData, setGetNewData] = useState(false);
    const [pagination, setPagination] = useState({ page: 1, totalPage: 5, limit: 5 });

    const [isEdit, setIsEdit] = useState(false);


    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const { TinDungs, totalPage } = await tinDungApi.getAll({ _page: pagination.page, _limit: pagination.limit });
                setPayments(TinDungs);
                setPagination(prev => ({ ...prev, totalPage }))

            } catch (error) {
                console.log(error);
            }
        };
        fetchPayments();
    }, [getNewData, pagination.page]);

    //handle change page 
    const handleChangePage = page => {
        setPagination(prev => ({ ...prev, page }))
    }

    const showModal = (City) => {
        setShowPaymentModal(true);
        setSelectedPayment(City);
    };

    const hideModal = () => {
        setShowPaymentModal(false);
    };

    const showDeleteModal = (City) => {
        setShowDeletePaymentModal(true);
        setSelectedPayment(City);
    };

    const hideDeleteModal = () => {
        setShowDeletePaymentModal(false);
    };

    const handleRemovePayment = async () => {
        try {
            setIsLoading(true);
            const response = await tinDungApi.delete(selectedPayment._id);
            message.success(response.message);
            setIsLoading(false);
            setShowDeletePaymentModal(false);
            setGetNewData(prev => !prev);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    //handle edit and add
    const handleEditAndAdd = async (values) => {
        try {
            const file = values.logo[0].originFileObj;
            let data;
            //is Edit
            if (isEdit) {
                if (file) {
                    data = new FormData();
                    data.append("TenTinDung", values.paymentName);
                    data.append("Logo", file);
                } else {
                    data = { TenTinDung: values.paymentName };
                }
                setIsLoading(true);
                const response = await tinDungApi.update(selectedPayment._id, data);
                setIsLoading(false);
                toastSucsess(response.message);
            }
            //is add 
            else {
                data = new FormData();
                data.append("TenTinDung", values.paymentName);
                data.append("Logo", file);
                setIsLoading(true);
                const response = await tinDungApi.add(data);
                setIsLoading(false);
                toastSucsess(response.message);
            }

            setGetNewData(prev => !prev);
            hideModal()

        } catch (error) {
            console.log(error);
            const errMessage = error.response.data;
            toastError(errMessage.message)
            setIsLoading(false);
        }
    }

    return (
        <div className="payment-list shadow-sm">
            <div className="payment-list__add-btn">
                <div
                    onClick={() => { showModal(null); setIsEdit(false) }}
                    className="payment-list__action shadow-sm  bg-info ">
                    <i class="bi bi-plus-lg"></i>
                </div>
            </div>
            <div className="table-responsive">
                <Table className="table table-sm table-hover align-middle">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Logo</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments?.map((payment, index) => (
                            <tr className="" key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    <img src={payment.Logo} alt="image" />
                                </td>
                                <td>
                                    <Badge color="dark">{payment.TenTinDung}</Badge>
                                </td>

                                <td>
                                    <div className="payment-list__actions">
                                        <div
                                            onClick={() => { showModal(payment); setIsEdit(true) }}
                                            className="payment-list__action shadow-sm bg-primary" >
                                            <i class="bi bi-pencil"></i>
                                        </div>

                                        <div
                                            onClick={() => showDeleteModal(payment)}
                                            className="payment-list__action shadow-sm bg-danger"
                                        >
                                            <i className="fa-solid fa-trash payment-list__icon"></i>
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

            {/* payment Detail Modale */}
            <DetailModal isOpen={showPaymentModal} hideModal={hideModal} size="md" >
                <PaymentForm isEdit={isEdit} selectedPayment={selectedPayment} onSubmit={handleEditAndAdd} isLoading={isLoading} />
            </DetailModal>

            {/* payment Delete Modale */}
            <DeleteModal
                isLoading={isLoading}
                isOpen={showDeletePaymentModal}
                hideDeleteModal={hideDeleteModal}
                handleRemove={handleRemovePayment}
            />
        </div>
    );
}

export default PaymentPage;
