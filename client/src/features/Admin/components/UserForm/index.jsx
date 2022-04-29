import { yupResolver } from "@hookform/resolvers/yup";
import { Spin } from "antd";
import positions from "constants/position";
import InputField from "custom-fields/BTInputField";
import BTSelectField from "custom-fields/BTSelectField";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Form, ModalFooter } from "reactstrap";
import {
  checkConfirmPassword,
  checkEmail,
  checkPassWord,
  checkPhone,
  checkSelect,
  checkStringRequired,
} from "utils/validate";
import * as yup from "yup";

function UserForm({ selectedUser, onSubmit, hideModal, isLoading }) {
  const [changePassword, setChangePassword] = useState(false);

  const defaultValues = {
    name: selectedUser.name,
    email: selectedUser.email,
    phone: selectedUser.phone,
    Quyen: positions.find((position) => position.value === selectedUser.Quyen), //Find Object contain position
  };

  const schema = yup.object().shape({
    name: checkStringRequired(yup),
    email: checkEmail(yup),
    phone: checkPhone(yup),
    Quyen: checkSelect(yup),
    password: changePassword ? checkPassWord(yup) : yup.string(),
    repeatPassword: checkConfirmPassword(yup),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, resolver: yupResolver(schema) });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        name="name"
        control={control}
        label="Full name"
        errors={errors}
        type="text"
      />

      <InputField
        name="email"
        control={control}
        label="Email"
        errors={errors}
        type="email"
      />

      <InputField
        name="phone"
        control={control}
        label="Phone"
        errors={errors}
        type="phone"
      />

      <BTSelectField
        name="Quyen"
        control={control}
        label="Roles"
        errors={errors}
        options={positions}
      />

      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            right: 0,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <input
            type="checkbox"
            id="inputCheckBox"
            style={{ position: "relative", top: "1px", left: "-2px" }}
            onClick={() => setChangePassword(!changePassword)}
          />
          <label htmlFor="inputCheckBox">Change Password</label>
        </div>
        <InputField
          name="password"
          control={control}
          label="Password"
          errors={errors}
          type="password"
          disabled={!changePassword}
        />
      </div>

      <InputField
        name="repeatPassword"
        control={control}
        label="Repeat Password"
        errors={errors}
        type="password"
        disabled={!changePassword}
      />

      <ModalFooter>
        <Button type="submit" color="primary">
          Update {isLoading && <Spin className="ml-1" size="small" />}
        </Button>{" "}
        <Button onClick={hideModal}>Cancel</Button>
      </ModalFooter>
    </Form>
  );
}

export default UserForm;
