import React, { useEffect, useState } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import getUserDetail from "../apis/getUserDetail";
import { useUserDetailStore } from "../stores/userDetailStore";
import { useUsersStore } from "../stores/usersStore";
import { useUserRolesStore } from "../stores/userRolesStore";
import getUserRoles from "../apis/getUserRoles";
import { useUserIdStore } from "../stores/userIdStore";

export default function UserTable() {
  const columns: ColumnsType<User> = [
    {
      title: "User Name",
      dataIndex: "username",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
  ];

  const usersStore = useUsersStore();
  const userDetailStore = useUserDetailStore();
  const userRolesStore = useUserRolesStore();
  const userIdStore = useUserIdStore();
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  useEffect(() => {
    if (usersStore?.data?.length > 0)
      handleRowOnClick(usersStore.data[0].id);
  }, [usersStore.data]);

  function handleOnRow(record: User, rowIndex: number | undefined) {
    const isSelected = selectedRowKeys.includes(record.id);

    return {
      onClick: (event: React.MouseEvent<any, MouseEvent>) => {
        let newSelectedRowKeys: any = [];

        if (!isSelected) {
          newSelectedRowKeys = [record.id];
        }

        setSelectedRowKeys(newSelectedRowKeys);
        handleRowOnClick(record.id);
      },
      className: isSelected ? "selected-row" : "",
    };
  }

  function handleRowOnClick(id: string) {
    userIdStore.setData(id);

    const response = getUserDetail(id);
    response.then((data) => {
      userDetailStore.setData(data);
    });

    const rolesResponse = getUserRoles(id);
    rolesResponse.then((data) => {
      userRolesStore.setData(data);
    });
  }

  return (
    <Table onRow={handleOnRow} columns={columns} dataSource={usersStore.data} />
  );
}
