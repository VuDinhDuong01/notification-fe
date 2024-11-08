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
import { decodeJWT } from "../util/decodeJWT";
const Header = () => {
  const [userId, setUserId] = useState<number  | null>(1);
  const decodeToken = decodeJWT(getDataFromLS() as string ) as { user_id: number } 
  useEffect(() => {
    setUserId(decodeToken?.user_id);
  }, [decodeToken]);
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
  
  const { data } = useQuery({
    queryKey: ['todos'],
    queryFn: () => filterNotification({ id: decodeToken.user_id}),
    enabled: Boolean(userId)
  })



  const socket = initializeSocket();

  useEffect(()=>{
    if(socket){
      socket.on('connect_error', (error:any) => {
        console.error('Connection error:', error.message);
        // Xử lý lỗi: Ví dụ như logout, hiển thị thông báo lỗi, v.v.
       
      });
    }
   
  },[socket])
  
  useEffect(() => {
    if (socket) {
      const handleData = (data: any) => {
        setNotifications((prev: any) => [data, ...prev]);
      };
      socket.on("server-form-data", handleData);
      return () => {
        socket.off("server-form-data", handleData);
      };
    }
  }, [socket]);

  useEffect(() => {
    setNotifications((data as any)?.data)
  }, [data])

  const filterViewNoti = useMemo(() => {
    return  notifications?.length === 0 ? 0 : notifications?.filter(item => !item.check_view_notification)?.length
  }, [notifications])


  const updateNoti = useMutation({
    mutationFn: (body: any) => updateNotification(body)
  })
  const handleUpdateNoti = async (item: any) => {
    await updateNoti.mutateAsync({
      id: item.id,
      check_view_notification: item.check_view_notification === true ? false : true
    }, {
      onSuccess: () => {
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
                    style={{ display: "flex", alignItems: "center", cursor: "pointer", background: `${!item.check_view_notification ? 'blue' : "black"}`, color: 'white' }}
                    onClick={() => handleUpdateNoti(item)}
                  >

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
        <h3>{userId === 1  ? "DUONG":"LONG"}</h3>
      </div>
    </div>
  );
};
export default Header;
