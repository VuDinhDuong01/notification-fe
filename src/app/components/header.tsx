/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useMemo, useState } from "react";
import { BellFilled, MailOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";

import { Badge, Menu, Popover } from "antd";
import { initializeSocket } from "@/socket";
import Link from "next/link";
import { getDataFromLS } from "../util/localStorage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { filterNotification, updateNotification } from "../util/api/query";

const Header = () => {
  const queryClient = useQueryClient()
  const [notifications, setNotifications] = useState<any[]>([]);
  type MenuItem = Required<MenuProps>["items"][number];

  const items: MenuItem[] = [
    {
      label: "Navigation One",
      key: "mail",
      icon: <MailOutlined />,
    },

    {
      key: "alipay",
      label: <Link href={"/form"}>form</Link>,
    },
    {
      key: "alipay",
      label: <Link href={"/user"}>user</Link>,
    },
  ];
  const [current, setCurrent] = useState("mail");
  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };
  const id= getDataFromLS()

  const {  data }= useQuery({ 
    queryKey: ['todos'], 
    queryFn: ()=>filterNotification({id}), 
    enabled:Boolean(id)
})

  const socket = initializeSocket();
  useEffect(() => {
    if (socket) {
      const handleData = (data: any) => {
        setNotifications((prev: any) => [ data,...prev]);
      };
      socket.on("server-form-data", handleData);
      return () => {
        socket.off("server-form-data", handleData);
      };
    }
  }, [socket]);

  useEffect(() => {
    setNotifications((data as any)?.data)
    console.log("1234drdfd")
  }, [data,notifications])

const filterViewNoti=useMemo(()=>{
  const filterNoti = notifications?.length  === 0 ? 0  : notifications?.filter(item=>!item.check_view_notification).length
  return filterNoti
}, [notifications])


const updateNoti= useMutation({
  mutationFn:(body: any)=>updateNotification(body)
})
  const handleUpdateNoti=async (item:any)=>{
    await updateNoti.mutateAsync({
       id: item.id,
       check_view_notification: !item.check_view_notification
    },{
      onSuccess:(data)=>{
        console.log(data)
        queryClient.invalidateQueries({ queryKey: ['todos'] })
      }
    })
  }
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <div style={{ marginRight: "150px" }}>
        <Popover
          content={
            notifications?.length > 0
              ? notifications.map((item, index) => {
                  return (
                    <div
                      key={index}
                      style={{ display: "flex", alignItems: "center", cursor:"pointer", background:`${!item.check_view_notification ? 'red':"black"}`, color:'blue' }}
                      onClick={()=>handleUpdateNoti(item)}
                    >
                      <div>{item.sender_notification}</div>
                      <div>{item.content}</div>
                    </div>
                  );
                })
              : "K CÓ THÔNG BÁO NÀO"
          }
          trigger="click"
        >
          <Badge
            count={filterViewNoti}
            // overflowCount={9}
          >
            <BellFilled />
          </Badge>
        </Popover>
      </div>
    </div>
  );
};
export default Header;
