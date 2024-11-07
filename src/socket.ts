/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { io } from "socket.io-client";
import { getDataFromLS } from "./app/util/localStorage";

let socket: any;

export const initializeSocket = () => {
    const name = getDataFromLS();
    if (!socket && name) {
        socket = io("http://localhost:8000/", {
            auth: {
                infoUser: getDataFromLS(),
                autoConnect: false,
                reconnection: false
            },
        });

        socket.connect();
    }
    return socket;
};

export const disconnectSocket = () => {
    const name = getDataFromLS();
    if (socket && !name) {
        socket.disconnect();
        socket = null;
    }
};
