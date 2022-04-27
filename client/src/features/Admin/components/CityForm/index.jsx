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

function CityForm({ selectedCity, onSubmit, hideModal, isLoading, isEdit }) {

    const defaultValues = {
        cityName: selectedCity?.TenThanhPho || "",
        image: selectedCity?.HinhAnh || "",
    };

    const schema = yup.object().shape({
        cityName: checkStringRequired(yup),
        image: checkRequired(yup),
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues, resolver: yupResolver(schema) });


    return (
        <Form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 400 }}>
            <InputField
                name="cityName"
                control={control}
                label="City Name"
                errors={errors}
                type="text"
            />

            <UploadField
                name="image"
                control={control}
                label="Image"
                errors={errors}
                maxCount={1}
                value={selectedCity?.HinhAnh ? [selectedCity.HinhAnh] : []}
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

export default CityForm;
