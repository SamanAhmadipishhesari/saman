import { Card, Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useUserDetailStore } from "../stores/userDetailStore";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import changeStatus from "../apis/changeStatus";
import { useUserIdStore } from "../stores/userIdStore";

export default function UserDetail() {
  TimeAgo.addDefaultLocale(en);
  TimeAgo.addLocale(ru);

  const userDetail = useUserDetailStore().data;
  const userId = useUserIdStore().data;

  const [isActive, setIsActive] = useState(false);

  function handleIsActiveChange(value: boolean) {
    setIsActive(value);
    const response = changeStatus(userId, value);
    response.then((data) => {
      //console.log("Status changed to " + value);
    });
    response.catch((error) => {
      //console.log(error);
    });
  }

  useEffect(() => {
    setIsActive(userDetail.isActive);
  }, [userDetail]);

  return (
    <Card>
      <div className="flex">
        {userDetail && userDetail.avatar ? (
          <img className="rounded-full w-14 h-14" src={userDetail.avatar} />
        ) : (
          <img
            className="rounded-full w-14 h-14"
            src={
              "https://drive.google.com/uc?id=16AhwHhz41f25Migl0N-GJ8taoGjxfmxB"
            }
          />
        )}

        <div className="ml-4 self-center">
          <span className="text-black text-base font-medium block mb-2">
            {userDetail.username}
          </span>
          <span className="text-zinc-500 text-sm block">
            {userDetail && userDetail.creationDate ? (
              <ReactTimeAgo
                date={new Date(userDetail.creationDate)}
                locale="en-US"
              />
            ) : (
              ""
            )}
          </span>
        </div>
        <div className="ml-auto">
          {new Date(userDetail.lockoutEnd) > new Date() ? (
            <>
              <span className="text-red-400 border-2 border-red-400 rounded py-2 px-4">
                User Is Blocked For{" "}
                <ReactTimeAgo
                  date={new Date(userDetail.lockoutEnd)}
                  locale="en-US"
                />
              </span>
            </>
          ) : userDetail.accessFailedCount == 0 ? (
            <span
              className={`text-green-400 border-2 border-green-400 rounded py-2 px-4`}
            >
              No Access failed
            </span>
          ) : (
            <span
              className={`text-red-400 border-2 border-red-400 rounded py-2 px-4`}
            >
              <strong>
                {userDetail.accessFailedCount?.toString()}
                {" / 5"}
              </strong>{" "}
              Access failed
            </span>
          )}
        </div>
      </div>
      <div className="mt-8 flex">
        <span className="text-black text-sm font-medium mb-2 mr-2">
          Active/Deactive
        </span>
        <Switch
          className={"theme-toggle-switch"}
          checked={isActive}
          onChange={handleIsActiveChange}
        />
      </div>
      <hr className="mt-4" />
      <span className="text-black text-sm font-medium block mb-2 text-right mt-4">
        {userDetail.firstName} {userDetail.lastName}
      </span>
      <span className="text-zinc-500 text-sm block font-normal mb-4 text-right mt-3">
        {userDetail.description}
      </span>
    </Card>
  );
}
