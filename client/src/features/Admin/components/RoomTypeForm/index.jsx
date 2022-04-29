import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "custom-fields/BTInputField";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form, ModalFooter } from "reactstrap";
import { checkStringRequired } from "utils/validate";
import * as yup from "yup";

function RoomTypeForm({ selectedRoomType, onSubmit, hideModal }) {
  const defaultValues = {
    TenLoaiPhong: selectedRoomType.TenLoaiPhong,
  };

  const schema = yup.object().shape({
    TenLoaiPhong: checkStringRequired(yup),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(schema) });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        name="TenLoaiPhong"
        control={control}
        label="Room Type"
        errors={errors}
        type="text"
      />

      <ModalFooter>
        <Button
          type="submit"
          color={selectedRoomType._id ? "success" : "primary"}
        >
          {selectedRoomType._id ? "Update" : "Add"}
        </Button>{" "}
        <Button onClick={hideModal}>Cancel</Button>
      </ModalFooter>
    </Form>
  );
}

export default RoomTypeForm;
