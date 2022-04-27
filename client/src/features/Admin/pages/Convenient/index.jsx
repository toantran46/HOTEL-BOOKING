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
import "./convenient.scss";
import { tienNghiApi } from "api/TienNghiApi";
import ConvenientForm from "features/Admin/components/ConvenientForm";

function ConvenientPage(props) {
    const [convenients, setConvenients] = useState([]);
    const [showConvenientModal, setShowConvenientModal] = useState(false);
    const [showDeleteConvenientModal, setShowDeleteConvenientModal] = useState(false);
    const [selectedConvenient, setSelectedConvenient] = useState({});



    const [isLoading, setIsLoading] = useState(false);

    const [getNewData, setGetNewData] = useState(false);

    const [isEdit, setIsEdit] = useState(false);


    useEffect(() => {
        const fetchConvenients = async () => {
            try {
                const { TienNghis } = await tienNghiApi.getAll();
                setConvenients(TienNghis);
            } catch (error) {
                console.log(error);
            }
        };
        fetchConvenients();
    }, [getNewData]);

    const showModal = (convenient) => {
        setShowConvenientModal(true);
        setSelectedConvenient(convenient);
    };

    const hideModal = () => {
        setShowConvenientModal(false);
    };

    const showDeleteModal = (convenient) => {
        setShowDeleteConvenientModal(true);
        setSelectedConvenient(convenient);
    };

    const hideDeleteModal = () => {
        setShowDeleteConvenientModal(false);
    };

    const handleRemoveConvenient = async () => {
        try {
            setIsLoading(true);
            const response = await tienNghiApi.delete(selectedConvenient._id);
            message.success(response.message);
            setIsLoading(false);
            setShowDeleteConvenientModal(false);
            setGetNewData(prev => !prev);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    };

    //handle edit and add
    const handleEditAndAdd = async (values) => {
        try {
            if (isEdit) {
                setIsLoading(true);
                const response = await tienNghiApi.update(selectedConvenient._id, { Icon: values.icon, TenTienNghi: values.convenientName });
                setIsLoading(false);
                message.success(response.message);
            }
            //is add 
            else {
                setIsLoading(true);
                const response = await tienNghiApi.add({ Icon: values.icon, TenTienNghi: values.convenientName });
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
        <div className="convenient-list shadow-sm">
            <div className="convenient-list__add-btn">
                <div
                    onClick={() => { showModal(null); setIsEdit(false) }}
                    className="convenient-list__action shadow-sm  bg-info ">
                    <i class="bi bi-plus-lg"></i>
                </div>
            </div>
            <div className="table-responsive">
                <Table className="table table-sm table-hover align-middle">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Icon</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {convenients.map((convenient, index) => (
                            <tr className="" key={index}>
                                <th scope="row">{index + 1}</th>
                                <td className="convenient-icon">
                                    <Badge color="warning"><span dangerouslySetInnerHTML={{ __html: convenient.Icon }} /></Badge>
                                </td>
                                <td>
                                    <Badge color="dark">{convenient.TenTienNghi}</Badge>
                                </td>

                                <td>
                                    <div className="convenient-list__actions">
                                        <div
                                            onClick={() => { showModal(convenient); setIsEdit(true) }}
                                            className="convenient-list__action shadow-sm bg-primary" >
                                            <i class="bi bi-pencil"></i>
                                        </div>

                                        <div
                                            onClick={() => showDeleteModal(convenient)}
                                            className="convenient-list__action shadow-sm bg-danger"
                                        >
                                            <i className="fa-solid fa-trash convenient-list__icon"></i>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            {/* Pagination */}
            <Pagination page={1} totalRows={50} limit={10} />

            {/* Convenient Detail Modale */}
            <DetailModal isOpen={showConvenientModal} hideModal={hideModal} size="md" >
                <ConvenientForm isEdit={isEdit} selectedConvenient={selectedConvenient} onSubmit={handleEditAndAdd} isLoading={isLoading} />
            </DetailModal>

            {/* Convenient Delete Modale */}
            <DeleteModal
                isLoading={isLoading}
                isOpen={showDeleteConvenientModal}
                hideDeleteModal={hideDeleteModal}
                handleRemove={handleRemoveConvenient}
            />
        </div>
    );
}

export default ConvenientPage;
