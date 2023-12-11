import { Button, Card, Input } from "antd";
import React, { useEffect, useState } from "react";
import changePassword from "../apis/changePassword";
import { useUserIdStore } from "../stores/userIdStore";

export default function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changePasswordButtonDisabled, setChangePasswordButtonDisabled] =
    useState(true);

  const userId = useUserIdStore().data;

  function handlePasswordChange(value: string) {
    setPassword(value);
  }

  function handleConfirmPasswordChange(value: string) {
    setConfirmPassword(value);
  }

  function handleChangePasswordClick() {
    const data: ChangePassword = {
      confirmPassword: confirmPassword,
      password: password,
    };
    changePassword(userId, data);
  }

  useEffect(() => {
    let isDisabled = false;
    if (password.length < 6 || password.length > 32) isDisabled = true;
    if (confirmPassword.length < 6 || confirmPassword.length > 32) isDisabled = true;
    if(password != confirmPassword) isDisabled = true;
    setChangePasswordButtonDisabled(isDisabled);
  }, [password, confirmPassword]);

  return (
    <Card>
      <span className="text-black text-base font-semibold mb-5 block">
        Change Password
      </span>

      <div className="flex grid grid-cols-12">
        <span className="text-md self-center font-normal col-span-3">
          New Password
        </span>
        <Input
          type="password"
          className="mr-8 col-span-9"
          onChange={(e) => handlePasswordChange(e.currentTarget.value)}
        />
      </div>

      <div className="flex grid grid-cols-12 mt-4">
        <span className="text-md self-center font-normal col-span-3">
          Confirm Password
        </span>
        <Input
          type="password"
          className="mr-8 col-span-9"
          onChange={(e) => handleConfirmPasswordChange(e.currentTarget.value)}
        />
      </div>

      <div className="text-right">
        <Button
          type="primary"
          className="mt-4"
          onClick={handleChangePasswordClick}
          disabled={changePasswordButtonDisabled}
        >
          Save
        </Button>
      </div>
    </Card>
  );
}
