import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "custom-fields/BTInputField";
import UploadField from "custom-fields/UploadField";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form, ModalFooter } from "reactstrap";
import { checkRequired, checkStringRequired } from "utils/validate";
import * as yup from "yup";

function HotelTypeForm({ selectedHotelType, onSubmit, hideModal }) {
  const defaultValues = {
    TenLoaiChoNghi: selectedHotelType.TenLoaiChoNghi,
    HinhAnh: selectedHotelType.HinhAnh,
  };

  const schema = yup.object().shape({
    TenLoaiChoNghi: checkStringRequired(yup),
    HinhAnh: checkRequired(yup),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(schema) });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        name="TenLoaiChoNghi"
        control={control}
        label="Hotel Type"
        errors={errors}
        type="text"
      />

      <UploadField
        name="HinhAnh"
        control={control}
        label="Image"
        errors={errors}
        maxCount={1}
        value={selectedHotelType?.HinhAnh ? [selectedHotelType.HinhAnh] : []}
      />

      <ModalFooter>
        <Button
          type="submit"
          color={selectedHotelType._id ? "success" : "primary"}
        >
          {selectedHotelType._id ? "Update" : "Add"}
        </Button>{" "}
        <Button onClick={hideModal}>Cancel</Button>
      </ModalFooter>
    </Form>
  );
}

export default HotelTypeForm;
