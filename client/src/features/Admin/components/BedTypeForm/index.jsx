import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "custom-fields/BTInputField";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form, ModalFooter } from "reactstrap";
import { checkStringRequired } from "utils/validate";
import * as yup from "yup";

function BedTypeForm({ selectedBedType, onSubmit, hideModal }) {
  const defaultValues = {
    TenLoaiGiuong: selectedBedType.TenLoaiGiuong,
  };

  const schema = yup.object().shape({
    TenLoaiGiuong: checkStringRequired(yup),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(schema) });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        name="TenLoaiGiuong"
        control={control}
        label="Bed Type"
        errors={errors}
        type="text"
      />

      <ModalFooter>
        <Button
          type="submit"
          color={selectedBedType._id ? "success" : "primary"}
        >
          {selectedBedType._id ? "Update" : "Add"}
        </Button>{" "}
        <Button onClick={hideModal}>Cancel</Button>
      </ModalFooter>
    </Form>
  );
}

export default BedTypeForm;
