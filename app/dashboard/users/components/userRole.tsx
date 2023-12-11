import { Button, Card, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useUserRolesStore } from "../stores/userRolesStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { useUserIdStore } from "../stores/userIdStore";
import denyRole from "../apis/denyRole";
import getUserRoles from "../apis/getUserRoles";
import { useRolesStore } from "../../roles/stores/s";
import { DefaultOptionType } from "antd/es/select";
import grantRole from "../apis/grantRole";

export default function UserRole() {
  const [defaultRole, setDefaultRole] = useState("");
  const [notGrantedRolesOption, setNotGrantedRolesOption] = useState<
    DefaultOptionType[]
  >([]);

  const rolesStore = useRolesStore();
  const userRolesStore = useUserRolesStore();
  const userId = useUserIdStore().data;

  const dictionary: Map<string, string> = new Map([
    ["TreatmentFundPhoneAdmin", "bg-orange-500"],
    ["BranchAdmin", "bg-lime-500"],
    ["FamilyPlanAdmin", "bg-blue-500"],
    ["DentalPlanAdmin", "bg-pink-500"],
    ["InsuranceCompaniesAdmin", "bg-fuchsia-500"],
    ["NewsLetterAdmin", "bg-purple-500"],
    ["NewsAdmin", "bg-red-500"],
    ["FaqAdmin", "bg-green-500"],
    ["FeedbackAdmin", "bg-yellow-500"],
  ]);

  useEffect(() => {
    const notGrantedRoles = rolesStore.data.filter(
      (role) => userRolesStore.data.indexOf(role.name) < 0
    );
    // console.log(notGrantedRoles);
    const options = notGrantedRoles.map((role) => {
      return { label: role.name, value: role.name };
    });
    setNotGrantedRolesOption(options);
  }, [userRolesStore.data]);

  function getColor(role: string) {
    const item = dictionary.get(role);
    if (item == undefined) return "bg-gray-500";

    return item;
  }

  function handleDenyRoleClick(userId: string, role: string) {
    const response = denyRole(userId, role);
    response.then((data) => {
      getUserRolesAndStore(userId);
    });
    response.catch((error) => {
      // console.log(error);
    });
  }

  function handleGrantRoleClick(role: string) {
    setDefaultRole(role);
    const response = grantRole(userId, role);
    response.then((data) => {
      getUserRolesAndStore(userId);
      setDefaultRole("");
    });
    response.catch((error) => {
      // console.log(error);
    });
  }

  async function getUserRolesAndStore(userId: string) {
    const rolesResponse = getUserRoles(userId);
    rolesResponse.then((data) => {
      userRolesStore.setData(data);
    });
    rolesResponse.catch((error) => {
      // console.log(error);
    });
  }

  return (
    <Card>
      <span className="text-black text-base font-semibold mb-5 block">
        Roles
      </span>
      <div className="flex flex-wrap">
        {userRolesStore.data.map((role) => {
          return (
            <span
              className={`${getColor(
                role
              )} text-white mr-3 px-3 py-1 rounded mb-3`}
            >
              {role}
              <a
                className="fa-btn-wrapper pl-2 pr-0"
                onClick={() => handleDenyRoleClick(userId, role)}
              >
                <FontAwesomeIcon color="white" icon={faRemove} />
              </a>
            </span>
          );
        })}
      </div>
      <Select
        className="-4 w-56"
        allowClear
        options={notGrantedRolesOption}
        onChange={handleGrantRoleClick}
        value={defaultRole}
      />
      <span className="text-gray-300 ml-2">(Open and choose the role)</span>
    </Card>
  );
}
