import React, { useEffect, useState } from "react";
import { Input, Modal, Select } from "antd";
import { useUserModalStore } from "../../stores/userModalStore";
import TextArea from "antd/es/input/TextArea";
import getRoles from "../../../roles/apis/getRoles";
import { DefaultOptionType } from "antd/es/cascader";
import registerUser from "../../apis/registerUser";
import getUsers from "../../apis/getUsers";
import { useUsersStore } from "../../stores/usersStore";
import { useRolesStore } from "../../../roles/stores/s";
import UserFilter from "../userFilter";
import { useUserFilterStore } from "../../stores/userFilterStore";
import { Validator } from "@/app/infrastructure/validator";

export default function Register() {
  const [formIsValid, setFormIsValid] = useState(false);
  const [username, setUsername] = useState("");
  const [usernameIsValid, setUsernameIsValid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionIsValid, setDescriptionIsValid] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [firstNameIsValid, setFirstNameIsValid] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameIsValid, setLastNameIsValid] = useState(false);
  const [rolesOption, setRolesOption] = useState<DefaultOptionType[]>([]);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const userModalStore = useUserModalStore();
  const usersStore = useUsersStore();
  const rolesStore = useRolesStore();

  useEffect(() => {
    const validator: Validator = new Validator(true, 3, 32);
    setUsernameIsValid(validator.Validate(username));

    
  }, [username]);

  useEffect(() => {
    setFormIsValid(usernameIsValid);
  }, [usernameIsValid])

  useEffect(() => {
    const options = rolesStore.data.map((role) => {
      return { label: role.name, value: role.name };
    });
    setRolesOption(options);
  }, [rolesStore.data]);

  const handleRoleChange = (value: string[]) => {
    setSelectedRoles(value);
  };

  async function register() {
    setConfirmLoading(true);
    const response = registerUser(
      username,
      password,
      description,
      firstName,
      lastName,
      selectedRoles
    );
    response.then((data) => {
      setConfirmLoading(false);
      userModalStore.setIsModalOpen(false);
      const userFilterStore = useUserFilterStore();

      const response = getUsers(userFilterStore.data);
      response.then((data) => {
        usersStore.setData(data);
      });
    });
    response.catch((error) => {
      setConfirmLoading(false);
    });
  }

  function usernameHandleChange(value: string) {
    setUsername(value);
  }

  function firstNameHandleChange(value: string) {
    setFirstName(value);
  }

  function lastNameHandleChange(value: string) {
    setLastName(value);
  }

  function passwordHandleChange(value: string) {
    setPassword(value);
  }

  function descriptionHandleChange(value: string) {
    setDescription(value);
  }

  const handleOk = () => {
    register();
  };

  const handleCancel = () => {
    userModalStore.setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Register User"
        open={userModalStore.isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        okButtonProps={{ disabled: !formIsValid }}
      >
        <hr style={{ border: "1px solid #d9d9d9" }} />
        <div className="flex grid grid-cols-12 mb-3 mt-5">
          <span className="mr-4 text-md self-center font-normal col-span-3">
            Username
          </span>
          <Input
            className="mr-8 col-span-9"
            onChange={(e) => usernameHandleChange(e.currentTarget.value)}
          />
        </div>
        <div className="flex grid grid-cols-12">
          <span className="mr-4 text-md self-center font-normal col-span-3">
            Password
          </span>
          <Input
            type="password"
            className="mr-8 col-span-9"
            onChange={(e) => passwordHandleChange(e.currentTarget.value)}
          />
        </div>
        <div className="flex grid grid-cols-12 mb-3 mt-5">
          <span className="mr-4 text-md self-center font-normal col-span-3">
            FirstName
          </span>
          <Input
            placeholder="به فارسی"
            className="mr-8 col-span-9 text-right rtl"
            onChange={(e) => firstNameHandleChange(e.currentTarget.value)}
          />
        </div>
        <div className="flex grid grid-cols-12 mb-3 mt-5">
          <span className="mr-4 text-md self-center font-normal col-span-3">
            LastName
          </span>
          <Input
            placeholder="به فارسی"
            className="mr-8 col-span-9 text-right rtl"
            onChange={(e) => lastNameHandleChange(e.currentTarget.value)}
          />
        </div>
        <div className="flex grid grid-cols-12">
          <span className="mr-4 text-md self-center font-normal col-span-3">
            Description
          </span>
          <TextArea
            className="mt-4 mr-8 col-span-9 text-right rtl"
            placeholder="توضیحات به فارسی"
            onChange={(e) => descriptionHandleChange(e.currentTarget.value)}
          />
        </div>
        <div className="flex grid grid-cols-12">
          <span className="mr-4 text-md self-center font-normal col-span-3">
            Roles
          </span>
          <Select
            className="mt-4 mr-8 col-span-9"
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            options={rolesOption}
            onChange={handleRoleChange}
          />
        </div>
      </Modal>
    </>
  );
}
