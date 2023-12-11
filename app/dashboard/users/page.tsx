"use client";
import React, { useEffect, useState } from "react";
import UserFilter from "./components/userFilter";
import UserTable from "./components/userTable";
import getUsers from "./apis/getUsers";
import { useUsersStore } from "./stores/usersStore";
import { Button } from "antd";
import { useUserModalStore } from "./stores/userModalStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import UserDetail from "./components/userDetail";
import ChangePassword from "./components/changePassword";
import RegisterModal from "./components/modals/registerModal";
import UserRole from "./components/userRole";
import { useRolesStore } from "../roles/stores/s";
import getRoles from "../roles/apis/getRoles";
import { useUserIdStore } from "./stores/userIdStore";
import { useUserFilterStore } from "./stores/userFilterStore";

export const metadata = {
  title: "Admin Users",
  description: "The list of backoffice's Admin users",
};
export default function UserPage() {
  const [showHideRightCards, setShowHideRightCards] = useState("block");
  const usersStore = useUsersStore();
  const modalStore = useUserModalStore();
  const rolesStore = useRolesStore();
  const userId = useUserIdStore().data;
  const userFilterStore = useUserFilterStore();
  async function getUsersAndStore() {
    const response = getUsers(userFilterStore.data);
    response.then((data) => {
      usersStore.setData(data);
    });
    // response.catch((error) => {
    //   console.log(error);
    // });
  }

  async function getRolesAndStore() {
    const response = getRoles();
    response.then((data) => {
      const roles: Role[] = data.map((role) => {
        return { name: role.name, id: role.id };
      });
      rolesStore.setData(roles);
    });
    // response.catch((error) => {
    //   console.log(error);
    // });
  }

  useEffect(() => {
    setShowHideRightCards(userId ? "block" : "hidden");
  }, [userId]);

  useEffect(() => {
    (async () => {
      await getUsersAndStore();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await getRolesAndStore();
    })();
  }, []);

  return (
    <div className="m-8">
      <div className="mb-12 flex bg-">
        <UserFilter />
        <Button
          type="primary"
          className="ml-auto"
          onClick={() => modalStore.setIsModalOpen(true)}
        >
          <FontAwesomeIcon icon={faAdd} />
        </Button>
        <RegisterModal />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-5">
          <UserTable />
        </div>
        <div className={`col-span-7 ${showHideRightCards}`}>
          <UserDetail />
          <div className="mt-4">
            <UserRole />
          </div>
          <div className="mt-4">
            <ChangePassword />
          </div>
        </div>
      </div>
    </div>
  );
}
