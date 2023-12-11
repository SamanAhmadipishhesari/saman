"use client";
import React, { useEffect, useState } from "react";
import getRoles from "./apis/getRoles";
import Role from "../common/components/role";
import deleteRole from "./apis/deleteRole";
import { Button, Card, Input } from "antd";
import addRole from "./apis/addRole";

export const metadata = {
  title: "Admin Roles",
  description: "The list of backoffice's roles",
};

export default function RolePage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [newRoleName, setNewRoleName] = useState("")

  function handlenewRoleNameChange(value: React.ChangeEvent<HTMLInputElement>) {
    setNewRoleName(value.currentTarget.value);
  }

  function handleAddNewRoleClick(){
    const response = addRole(newRoleName);
    response.then((data) => {
      loadRoles();
      setNewRoleName("")
    });
    response.catch((error) => {});
  }

  function deleteRoleHandler(role: string) {
    const response = deleteRole(role);
    response.then((data) => {
      loadRoles();
    });
    response.catch((error) => {});
  }

  useEffect(() => {
    loadRoles();
  }, []);

  function loadRoles() {
    const response = getRoles();
    response.then((data) => {
      const roles: Role[] = data.map((role) => {
        return { name: role.name, id: role.id };
      });
      setRoles(roles);
    });
  }

  return (
    <div className="m-8 flex-wrap">
      {roles.map((role) => {
        return (
          <Role
            title={role.name}
            onDelete={() => deleteRoleHandler(role.name)}
          />
        );
      })}
      <Card className="mt-4">
        <span className="text-black text-base font-semibold mb-5 block">
          Add New Role
        </span>
        <Input className="-4 w-56" maxLength={256} allowClear value={newRoleName} onChange={handlenewRoleNameChange}/>
        <Button className="text-gray-300 ml-2" type="primary" onClick={handleAddNewRoleClick}>Add</Button>
      </Card>
    </div>
  );
}
