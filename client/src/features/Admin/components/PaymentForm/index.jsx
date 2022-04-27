import { yupResolver } from "@hookform/resolvers/yup";
import positions from "constants/position";
import InputField from "custom-fields/BTInputField";
import BTSelectField from "custom-fields/BTSelectField";
import UploadField from "custom-fields/UploadField";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, ModalFooter } from "reactstrap";
import { Spin } from "antd";
import {
    checkRequired,
    checkStringRequired,
} from "utils/validate";
import * as yup from "yup";

function PaymentForm({ selectedPayment, onSubmit, hideModal, isLoading, isEdit }) {

    const defaultValues = {
        paymentName: selectedPayment?.TenTinDung || "",
        logo: selectedPayment?.Logo || "",
    };

    const schema = yup.object().shape({
        paymentName: checkStringRequired(yup),
        logo: checkRequired(yup),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues, resolver: yupResolver(schema) });


    return (
        <Form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400 }}>
            <InputField
                name="paymentName"
                control={control}
                label="Payment Name"
                errors={errors}
                type="text"
            />

            <UploadField
                name="logo"
                control={control}
                label="Logo"
                errors={errors}
                maxCount={1}
                value={selectedPayment?.Logo ? [selectedPayment.Logo] : []}
            />

            <ModalFooter>
                <Button type="submit" color="primary">
                    {isEdit ? 'Update ' : 'Add '} {isLoading && <Spin size="small" />}
                </Button>{" "}
                <Button onClick={hideModal}>Cancel</Button>
            </ModalFooter>
        </Form>
    );
}

export default PaymentForm;
