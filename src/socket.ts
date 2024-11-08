/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { io } from "socket.io-client";
import { getDataFromLS } from "./app/util/localStorage";

let socket: any;

export const initializeSocket = () => {
  const token = getDataFromLS();
  if (!socket && token) {
    socket = io("http://localhost:8000/", {
      auth: {
        token: getDataFromLS(),
        autoConnect: false,
        reconnection: false,
      },
    });
    socket.connect();
  }
  return socket;
};

export const disconnectSocket = () => {
  const token = getDataFromLS();
  if (socket && !token) {
    socket.disconnect();
    socket = null;
  }
};
