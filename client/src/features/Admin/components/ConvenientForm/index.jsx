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

function ConvenientForm({ selectedConvenient, onSubmit, hideModal, isLoading, isEdit }) {

    const defaultValues = {
        icon: selectedConvenient?.Icon || "",
        convenientName: selectedConvenient?.TenTienNghi || "",
    };

    const schema = yup.object().shape({
        icon: checkStringRequired(yup),
        convenientName: checkStringRequired(yup),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues, resolver: yupResolver(schema) });


    return (
        <Form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400 }}>
            <InputField
                name="icon"
                control={control}
                label="Icon <svg>"
                errors={errors}
                type="text"
            />

            <InputField
                name="convenientName"
                control={control}
                label="Convenient Name"
                errors={errors}
                type="text"
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

export default ConvenientForm;
