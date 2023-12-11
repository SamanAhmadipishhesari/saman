import React, { useEffect, useState } from "react";
import { Input, Select } from "antd";
import { useUserFilterStore } from "../stores/userFilterStore";
import getUsers from "../apis/getUsers";
import { useUsersStore } from "../stores/usersStore";
import { useUserIdStore } from "../stores/userIdStore";

export default function UserFilter() {
  const userFilterStore = useUserFilterStore();
  const usersStore = useUsersStore();
  const userIdStore = useUserIdStore();

  const [term, setTerm] = useState("");
  const [isActive, setIsActive] = useState("All");
  function handleTermChange(value: React.ChangeEvent<HTMLInputElement>) {
    setTerm(value.currentTarget.value);
  }

  function handleIsActiveChange(value: string) {
    setIsActive(value);
  }

  async function getUsersAndStore() {
    const response = getUsers(userFilterStore.data);
    response.then((data) => {
      usersStore.setData(data);
      userIdStore.setData("");
    });
  }

  useEffect(() => {
    userFilterStore.data.isActive =
      isActive == "All" ? null : isActive == "Deactive" ? false : true;
    userFilterStore.data.term = term;

    (async () => {
      await getUsersAndStore();
    })();
  }, [term, isActive]);

  return (
    <>
      <span className="mr-4 text-md self-center font-normal text-md">
        Search Term
      </span>
      <Input
        className="mr-8 w-96"
        placeholder="usrename,first name,last name"
        onChange={handleTermChange}
        value={term}
        allowClear
      />

      <span className="mr-4 text-md self-center font-normal text-md">
        Status
      </span>
      <Select
        defaultValue="All"
        style={{ width: 120 }}
        onChange={handleIsActiveChange}
        options={[
          { value: "All", label: "All" },
          { value: "Active", label: "Active" },
          { value: "Deactive", label: "Deactive" },
        ]}
        value={isActive}
      />
    </>
  );
}
